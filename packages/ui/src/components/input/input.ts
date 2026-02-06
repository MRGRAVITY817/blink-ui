import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens';
import { inputStyles } from './input.styles';

/** Supported input size values. */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * A text input component for the Blink UI design system.
 *
 * @element bl-input
 *
 * @csspart label - The label element above the input.
 * @csspart input - The native `<input>` element, exposed for external styling.
 * @csspart help-text - The help text element below the input.
 *
 * @cssproperty --bl-color-neutral-300 - Default border color for the input.
 * @cssproperty --bl-color-neutral-700 - Label text color.
 * @cssproperty --bl-color-neutral-500 - Help text color.
 * @cssproperty --bl-color-primary-500 - Border color when the input is focused.
 * @cssproperty --bl-color-danger-500 - Border and help text color when in error state.
 * @cssproperty --bl-radius-md - Border radius for the input.
 * @cssproperty --bl-font-size-sm - Font size for label and help text.
 * @cssproperty --bl-font-size-md - Default font size for the input.
 * @cssproperty --bl-focus-ring-width - Width of the focus ring.
 * @cssproperty --bl-focus-ring-color - Color of the focus ring.
 * @cssproperty --bl-transition-fast - Transition duration and easing for interactive states.
 *
 * @fires bl-input - Emitted when the user types into the input.
 * @fires bl-change - Emitted when the input value is committed (on native change).
 */
@customElement('bl-input')
export class BlInput extends LitElement {
  static override styles = [tokens, inputStyles];

  /**
   * The current value of the input.
   * @attr value
   */
  @property()
  value = '';

  /**
   * Placeholder text displayed when the input is empty.
   * @attr placeholder
   */
  @property()
  placeholder = '';

  /**
   * Label text displayed above the input.
   * @attr label
   */
  @property()
  label = '';

  /**
   * Help text displayed below the input.
   * @attr help-text
   */
  @property({ attribute: 'help-text' })
  helpText = '';

  /**
   * The type of the input (e.g. text, email, password).
   * @attr type
   */
  @property()
  type = 'text';

  /**
   * The size of the input.
   * @attr size
   */
  @property({ reflect: true })
  size: InputSize = 'md';

  /**
   * When true the input is non-interactive and visually dimmed.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * When true the input displays an error state.
   * @attr error
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  private _handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('bl-input', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`<label part="label">${this.label}</label>`
          : nothing}
        <input
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? 'true' : nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.helpText
          ? html`<div part="help-text">${this.helpText}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
