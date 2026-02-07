import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandStyles } from './command.styles.js';
import { FilterController } from '../../controllers/filter.js';
import type { BlCommandItem } from './command-item.js';

/**
 * Inline command list (non-modal).
 *
 * @element bl-command
 * @slot - Command input, list, groups, items.
 * @fires bl-command-select - Emitted when an item is chosen.
 * @fires bl-command-input - Emitted when search text changes.
 */
@customElement('bl-command')
export class BlCommand extends LitElement {
  static override styles = [tokens, commandStyles];

  private _filter = new FilterController(this, {
    selector: 'bl-command-item:not([disabled])',
  });
  private _highlightedIndex = -1;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('bl-command-item-click', this._handleItemClick as EventListener);
    this.addEventListener('bl-command-input-change', this._handleInputChange as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('bl-command-item-click', this._handleItemClick as EventListener);
    this.removeEventListener('bl-command-input-change', this._handleInputChange as EventListener);
  }

  private _getVisibleItems(): BlCommandItem[] {
    return Array.from(
      this.querySelectorAll<BlCommandItem>('bl-command-item'),
    ).filter((item) => !item.hidden && !item.disabled);
  }

  private _handleInputChange = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this._filter.filter(e.detail.value);

    this.dispatchEvent(
      new CustomEvent('bl-command-input', {
        detail: { value: e.detail.value },
        composed: true,
        bubbles: true,
      }),
    );

    // Highlight first visible
    const items = this._getVisibleItems();
    if (items.length > 0) this._highlightIndex(0);
    else this._highlightedIndex = -1;
  };

  private _handleItemClick = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('bl-command-select', {
        detail: { value: e.detail.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    const items = this._getVisibleItems();
    if (items.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._highlightIndex(
          this._highlightedIndex + 1 >= items.length ? 0 : this._highlightedIndex + 1,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._highlightIndex(
          this._highlightedIndex - 1 < 0 ? items.length - 1 : this._highlightedIndex - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (this._highlightedIndex >= 0 && this._highlightedIndex < items.length) {
          const item = items[this._highlightedIndex]!;
          this.dispatchEvent(
            new CustomEvent('bl-command-select', {
              detail: { value: item.value },
              composed: true,
              bubbles: true,
            }),
          );
        }
        break;
    }
  };

  private _highlightIndex(index: number): void {
    const items = this._getVisibleItems();
    items.forEach((item) => item.setHighlighted(false));
    if (index >= 0 && index < items.length) {
      this._highlightedIndex = index;
      items[index]!.setHighlighted(true);
      items[index]!.scrollIntoView({ block: 'nearest' });
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command': BlCommand;
  }
}
