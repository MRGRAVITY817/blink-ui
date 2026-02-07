import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { dataTableStyles } from './data-table.styles.js';
import { GridNavigationController } from '../../controllers/grid-navigation.js';

/**
 * Data table root container with `role="grid"`.
 * Sorting is declarative — clicking a header fires `bl-sort-change`, consumer re-orders data.
 *
 * @element bl-data-table
 * @slot - `bl-table-header` and `bl-table-body` elements.
 * @fires bl-sort-change - Emitted when a sortable header is clicked.
 * @fires bl-selection-change - Emitted when row selection changes.
 * @fires bl-row-click - Emitted when a row is clicked.
 */
@customElement('bl-data-table')
export class BlDataTable extends LitElement {
  static override styles = [tokens, dataTableStyles];

  private _grid = new GridNavigationController(this, {
    rowSelector: 'bl-table-row',
    cellSelector: 'bl-table-header-cell, bl-table-cell',
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'grid');
    this.addEventListener('bl-header-sort', this._handleSort as EventListener);
    this.addEventListener('bl-row-select', this._handleRowSelect as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-header-sort', this._handleSort as EventListener);
    this.removeEventListener('bl-row-select', this._handleRowSelect as EventListener);
  }

  private _handleSort = (e: CustomEvent<{ column: string; direction: string }>): void => {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('bl-sort-change', {
        detail: e.detail,
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleRowSelect = (e: CustomEvent): void => {
    e.stopPropagation();
    const rows = Array.from(this.querySelectorAll('bl-table-row[selected]'));
    const selected = rows.map((r) => r.getAttribute('data-row-id') ?? '');
    this.dispatchEvent(
      new CustomEvent('bl-selection-change', {
        detail: { selected },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <table class="table" part="table">
        <slot></slot>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-data-table': BlDataTable;
  }
}
