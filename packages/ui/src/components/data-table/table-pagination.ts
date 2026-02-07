import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tablePaginationStyles } from './data-table.styles.js';

/**
 * Pagination controls for data table.
 *
 * @element bl-table-pagination
 * @fires bl-page-change - Emitted when the page changes.
 */
@customElement('bl-table-pagination')
export class BlTablePagination extends LitElement {
  static override styles = [tokens, tablePaginationStyles];

  /** Current page (1-indexed). */
  @property({ type: Number })
  page = 1;

  /** Total number of pages. */
  @property({ type: Number, attribute: 'total-pages' })
  totalPages = 1;

  /** Total number of rows (for display). */
  @property({ type: Number, attribute: 'total-rows' })
  totalRows = 0;

  /** Rows per page (for display). */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  private _goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.dispatchEvent(
      new CustomEvent('bl-page-change', {
        detail: { page: this.page },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.totalRows);

    return html`
      <nav class="pagination" part="base" aria-label="Table pagination">
        <div class="info">
          ${this.totalRows > 0
            ? html`<span>${start}–${end} of ${this.totalRows}</span>`
            : html`<span>No results</span>`}
        </div>
        <div class="controls">
          <button
            aria-label="First page"
            ?disabled=${this.page <= 1}
            @click=${() => this._goToPage(1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </button>
          <button
            aria-label="Previous page"
            ?disabled=${this.page <= 1}
            @click=${() => this._goToPage(this.page - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span class="page-info">Page ${this.page} of ${this.totalPages}</span>
          <button
            aria-label="Next page"
            ?disabled=${this.page >= this.totalPages}
            @click=${() => this._goToPage(this.page + 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button
            aria-label="Last page"
            ?disabled=${this.page >= this.totalPages}
            @click=${() => this._goToPage(this.totalPages)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="13 17 18 12 13 7"></polyline>
              <polyline points="6 17 11 12 6 7"></polyline>
            </svg>
          </button>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-pagination': BlTablePagination;
  }
}
