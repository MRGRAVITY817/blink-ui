import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandStyles } from './command.styles.js';
import { FilterController } from '../../controllers/filter.js';
import type { BlCommandItem } from './command-item.js';

/**
 * Inline command list (non-modal).
 * Supports scored filtering, loop navigation, keywords, and controlled mode.
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
    mode: 'scored',
    keywordsAttr: 'keywords',
  });
  private _highlightedIndex = -1;

  /** Enable loop navigation (wrap around from last to first and vice versa). */
  @property({ type: Boolean })
  loop = true;

  /** Set to false to disable built-in filtering (for async/external filtering). */
  @property({ type: Boolean, attribute: 'should-filter' })
  shouldFilter = true;

  /** Custom filter function. Overrides the built-in scored filter. */
  @property({ attribute: false })
  filter?: (itemText: string, query: string) => boolean;

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

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('filter') && this.filter) {
      this._filter.setMode(this.filter);
    }
  }

  private _getVisibleItems(): BlCommandItem[] {
    return Array.from(
      this.querySelectorAll<BlCommandItem>('bl-command-item'),
    ).filter((item) => !item.hidden && !item.disabled);
  }

  private _handleInputChange = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();

    if (this.shouldFilter) {
      this._filter.filter(e.detail.value);
      this._updateGroupVisibility();
      this._updateEmptyVisibility();
    }

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
      case 'ArrowDown': {
        e.preventDefault();
        const next = this._highlightedIndex + 1;
        if (next >= items.length) {
          this._highlightIndex(this.loop ? 0 : items.length - 1);
        } else {
          this._highlightIndex(next);
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = this._highlightedIndex - 1;
        if (prev < 0) {
          this._highlightIndex(this.loop ? items.length - 1 : 0);
        } else {
          this._highlightIndex(prev);
        }
        break;
      }
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
      case 'Home':
        e.preventDefault();
        this._highlightIndex(0);
        break;
      case 'End':
        e.preventDefault();
        this._highlightIndex(items.length - 1);
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

  private _updateGroupVisibility(): void {
    const groups = this.querySelectorAll('bl-command-group');
    for (const group of groups) {
      if (group.hasAttribute('force-mount')) continue;
      const visibleItems = group.querySelectorAll('bl-command-item:not([hidden])');
      (group as HTMLElement).hidden = visibleItems.length === 0;
    }
  }

  private _updateEmptyVisibility(): void {
    const empty = this.querySelector('bl-command-empty');
    if (!empty) return;
    const visibleItems = this._getVisibleItems();
    (empty as HTMLElement).hidden = visibleItems.length > 0;
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
