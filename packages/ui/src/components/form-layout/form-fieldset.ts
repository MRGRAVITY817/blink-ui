import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { formFieldsetStyles } from './form-layout.styles.js';

/**
 * Groups fields with `<fieldset>` + `<legend>`.
 *
 * @element bl-form-fieldset
 * @slot - `bl-form-field` elements.
 */
@customElement('bl-form-fieldset')
export class BlFormFieldset extends LitElement {
  static override styles = [tokens, formFieldsetStyles];

  /** The legend text for the fieldset. */
  @property()
  legend = '';

  protected override render() {
    return html`
      <fieldset part="base">
        ${this.legend ? html`<legend part="legend">${this.legend}</legend>` : ''}
        <div class="fieldset-content">
          <slot></slot>
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-form-fieldset': BlFormFieldset;
  }
}
