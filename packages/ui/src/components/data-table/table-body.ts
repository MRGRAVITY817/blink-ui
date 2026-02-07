import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableBodyStyles } from './data-table.styles.js';

/**
 * Table body row group.
 *
 * @element bl-table-body
 * @slot - `bl-table-row` elements with `bl-table-cell` children.
 */
@customElement('bl-table-body')
export class BlTableBody extends LitElement {
  static override styles = [tokens, tableBodyStyles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-body': BlTableBody;
  }
}
