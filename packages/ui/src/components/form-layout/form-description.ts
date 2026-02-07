import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { formDescriptionStyles } from './form-layout.styles.js';

/**
 * Help text for a form field, linked via `aria-describedby`.
 *
 * @element bl-form-description
 * @slot - Description text.
 */
@customElement('bl-form-description')
export class BlFormDescription extends LitElement {
  static override styles = [tokens, formDescriptionStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-form-description': BlFormDescription;
  }
}
