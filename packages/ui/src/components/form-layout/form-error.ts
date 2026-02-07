import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { formErrorStyles } from './form-layout.styles.js';

/**
 * Error message for a form field. Sets `aria-invalid` on the associated control.
 *
 * @element bl-form-error
 * @slot - Error message text.
 */
@customElement('bl-form-error')
export class BlFormError extends LitElement {
  static override styles = [tokens, formErrorStyles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'alert');
  }

  protected override render() {
    return html`
      <div class="error">
        <svg
          class="error-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-form-error': BlFormError;
  }
}
