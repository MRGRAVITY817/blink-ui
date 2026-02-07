import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxChipsStyles } from './combobox.styles.js';

export interface ComboboxChipItem {
  value: string;
  label: string;
}

/**
 * Horizontal chip list showing selected items in multi-select combobox mode.
 * Each chip displays a label and a remove button (X icon).
 *
 * @element bl-combobox-chips
 * @fires bl-chip-remove - Emitted when a chip's remove button is clicked. Detail: `{ value: string }`.
 */
@customElement('bl-combobox-chips')
export class BlComboboxChips extends LitElement {
  static override styles = [tokens, comboboxChipsStyles];

  /** Array of selected items to display as chips. */
  @property({ type: Array })
  items: ComboboxChipItem[] = [];

  /** Whether the chips are in a disabled state (remove buttons hidden). */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleRemove(value: string, e: Event): void {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-chip-remove', {
        detail: { value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    if (this.items.length === 0) return nothing;

    return html`
      <div class="chips" part="chips" role="list" aria-label="Selected items">
        ${this.items.map(
          (item) => html`
            <span class="chip" part="chip" role="listitem">
              <span class="chip-label">${item.label}</span>
              ${!this.disabled
                ? html`
                    <button
                      class="chip-remove"
                      part="chip-remove"
                      type="button"
                      aria-label="Remove ${item.label}"
                      tabindex="-1"
                      @click=${(e: Event) => this._handleRemove(item.value, e)}
                      @mousedown=${(e: Event) => e.preventDefault()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  `
                : nothing}
            </span>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox-chips': BlComboboxChips;
  }
}
