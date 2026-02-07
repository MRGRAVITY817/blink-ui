import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxGroupStyles } from './combobox.styles.js';

/**
 * Groups combobox items with a label.
 *
 * @element bl-combobox-group
 * @slot - `bl-combobox-item` elements.
 */
@customElement('bl-combobox-group')
export class BlComboboxGroup extends LitElement {
  static override styles = [tokens, comboboxGroupStyles];

  /** Group label text. */
  @property()
  label = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('label') && this.label) {
      this.setAttribute('aria-label', this.label);
    }
  }

  protected override render() {
    return html`
      ${this.label ? html`<div class="label" part="label">${this.label}</div>` : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox-group': BlComboboxGroup;
  }
}
