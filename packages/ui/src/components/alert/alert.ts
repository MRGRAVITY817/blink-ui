import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens';
import { alertStyles } from './alert.styles';

/** Supported alert variant values. */
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

/**
 * A dismissible alert component for the Blink UI design system.
 *
 * Alerts communicate contextual feedback messages to the user, such as
 * informational notices, success confirmations, warnings, or errors.
 *
 * @element bl-alert
 *
 * @slot - Default slot for alert message content.
 *
 * @csspart alert - The container `<div>` element, exposed for external styling.
 * @csspart close-button - The close `<button>` element, exposed for external styling.
 *
 * @fires bl-dismiss - Fired when the user clicks the close button. The event is composed and bubbles.
 *
 * @cssproperty --bl-color-primary-50 - Info variant background color.
 * @cssproperty --bl-color-primary-500 - Info variant border-left color.
 * @cssproperty --bl-color-primary-800 - Info variant text color.
 * @cssproperty --bl-color-success-50 - Success variant background color.
 * @cssproperty --bl-color-success-500 - Success variant border-left color.
 * @cssproperty --bl-color-success-800 - Success variant text color.
 * @cssproperty --bl-color-warning-50 - Warning variant background color.
 * @cssproperty --bl-color-warning-500 - Warning variant border-left color.
 * @cssproperty --bl-color-warning-800 - Warning variant text color.
 * @cssproperty --bl-color-danger-50 - Danger variant background color.
 * @cssproperty --bl-color-danger-500 - Danger variant border-left color.
 * @cssproperty --bl-color-danger-800 - Danger variant text color.
 * @cssproperty --bl-spacing-md - Alert vertical padding.
 * @cssproperty --bl-spacing-lg - Alert horizontal padding.
 * @cssproperty --bl-radius-md - Alert border radius.
 */
@customElement('bl-alert')
export class BlAlert extends LitElement {
  static override styles = [tokens, alertStyles];

  /**
   * The visual style of the alert indicating its semantic purpose.
   * @attr variant
   */
  @property({ reflect: true })
  variant: AlertVariant = 'info';

  /**
   * When true, a close button is rendered allowing the user to dismiss the alert.
   * @attr closable
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Controls the visibility of the alert. Set to `false` to hide the alert.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  private _handleClose() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('bl-dismiss', {
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    return html`
      <div class="alert" part="alert" role="alert">
        <slot></slot>
        ${this.closable
          ? html`
              <button
                class="close-button"
                part="close-button"
                aria-label="Dismiss alert"
                @click=${this._handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
