import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableHeaderStyles } from './data-table.styles.js';

/**
 * Table header row group.
 *
 * @element bl-table-header
 * @slot - `bl-table-row` with `bl-table-header-cell` elements.
 */
@customElement('bl-table-header')
export class BlTableHeader extends LitElement {
  static override styles = [tokens, tableHeaderStyles];

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
    'bl-table-header': BlTableHeader;
  }
}
