import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { formLayoutStyles } from './form-layout.styles.js';

export type FormLayoutDirection = 'vertical' | 'horizontal' | 'inline';

/**
 * Container that sets the layout direction for form fields.
 *
 * @element bl-form-layout
 * @slot - `bl-form-field` and `bl-form-fieldset` elements.
 */
@customElement('bl-form-layout')
export class BlFormLayout extends LitElement {
  static override styles = [tokens, formLayoutStyles];

  /** Layout direction. */
  @property({ reflect: true })
  layout: FormLayoutDirection = 'vertical';

  protected override render() {
    return html`
      <div class="form-layout" part="base">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-form-layout': BlFormLayout;
  }
}
