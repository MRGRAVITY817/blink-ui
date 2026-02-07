import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableCellStyles } from './data-table.styles.js';

/**
 * A data table cell.
 *
 * @element bl-table-cell
 * @slot - Cell content.
 */
@customElement('bl-table-cell')
export class BlTableCell extends LitElement {
  static override styles = [tokens, tableCellStyles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'gridcell');
    this.setAttribute('tabindex', '-1');
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-cell': BlTableCell;
  }
}
