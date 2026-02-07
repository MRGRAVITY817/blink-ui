import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxTriggerStyles } from './combobox.styles.js';

/**
 * Button-style trigger for popup mode combobox (alternative to input-always-visible).
 * Displays the currently selected value text or a placeholder.
 *
 * @element bl-combobox-trigger
 * @fires bl-trigger-click - Emitted when the trigger button is clicked.
 */
@customElement('bl-combobox-trigger')
export class BlComboboxTrigger extends LitElement {
  static override styles = [tokens, comboboxTriggerStyles];

  /** Placeholder text shown when no value is selected. */
  @property()
  placeholder = 'Select an option...';

  /** The currently selected value text to display. */
  @property()
  value = '';

  /** Whether the trigger is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the associated popup is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-trigger-click', {
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    const hasValue = this.value.length > 0;

    return html`
      <button
        class="trigger"
        part="trigger"
        type="button"
        role="combobox"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="listbox"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="trigger-text ${hasValue ? '' : 'placeholder'}">
          ${hasValue ? this.value : this.placeholder}
        </span>
        <svg
          class="trigger-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox-trigger': BlComboboxTrigger;
  }
}
