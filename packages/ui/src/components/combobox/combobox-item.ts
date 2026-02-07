import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxItemStyles } from './combobox.styles.js';

/**
 * A single option within a combobox.
 * Shows a checkmark when selected in single-select mode,
 * or a checkbox indicator in multi-select mode.
 *
 * @element bl-combobox-item
 * @slot - Item label text.
 */
@customElement('bl-combobox-item')
export class BlComboboxItem extends LitElement {
  static override styles = [tokens, comboboxItemStyles];

  private _itemId = `bl-cb-opt-${Math.random().toString(36).slice(2, 9)}`;

  /** The value this item represents. */
  @property()
  value = '';

  /** Whether this item is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.id = this.id || this._itemId;
    this.addEventListener('click', this._handleClick);
    this.addEventListener('mouseenter', this._handleMouseEnter);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('mouseenter', this._handleMouseEnter);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  /** Get the display text. */
  getLabel(): string {
    return (this.textContent ?? '').trim();
  }

  /** Set highlighted state. */
  setHighlighted(highlighted: boolean): void {
    if (highlighted) {
      this.setAttribute('data-highlighted', '');
    } else {
      this.removeAttribute('data-highlighted');
    }
  }

  /** Set selected state. */
  setSelected(selected: boolean): void {
    this.setAttribute('aria-selected', String(selected));
  }

  /** Mark this item as being in multi-select mode. */
  setMultiselect(multi: boolean): void {
    if (multi) {
      this.setAttribute('data-multiselect', '');
    } else {
      this.removeAttribute('data-multiselect');
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-combobox-item-select', {
        detail: { value: this.value, label: this.getLabel() },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleMouseEnter = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-combobox-item-highlight', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <div class="item" part="item">
        <!-- Single-select checkmark -->
        <svg
          class="check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <!-- Multi-select checkbox indicator -->
        <span class="multi-check" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox-item': BlComboboxItem;
  }
}
