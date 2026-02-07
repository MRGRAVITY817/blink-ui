import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxEmptyStyles } from './combobox.styles.js';

/**
 * "No results" placeholder for combobox.
 *
 * @element bl-combobox-empty
 * @slot - Custom empty state content.
 */
@customElement('bl-combobox-empty')
export class BlComboboxEmpty extends LitElement {
  static override styles = [tokens, comboboxEmptyStyles];

  protected override render() {
    return html`<slot>No results found</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox-empty': BlComboboxEmpty;
  }
}
