import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { tokens } from '../../styles/tokens.js';
import { dataTableStyles } from './data-table.styles.js';
import {
  TableController,
  flexRender,
} from '@tanstack/lit-table';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  TableOptions,
  Row,
  OnChangeFn,
} from '@tanstack/table-core';
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/table-core';

export type { ColumnDef } from '@tanstack/table-core';

/**
 * TanStack Table-powered data table with sorting, filtering,
 * pagination, row selection, and column visibility.
 *
 * @element bl-data-table
 * @fires bl-sort-change - Emitted when sorting changes.
 * @fires bl-selection-change - Emitted when row selection changes.
 * @fires bl-row-click - Emitted when a row is clicked.
 * @fires bl-page-change - Emitted when pagination changes.
 * @fires bl-filter-change - Emitted when column filters change.
 */
@customElement('bl-data-table')
export class BlDataTable<T = unknown> extends LitElement {
  static override styles = [tokens, dataTableStyles];

  private _tableController = new TableController<T>(this);

  /** Column definitions (TanStack ColumnDef[]). */
  @property({ attribute: false })
  columns: ColumnDef<T, any>[] = [];

  /** Table data array. */
  @property({ attribute: false })
  data: T[] = [];

  /** Enable row selection. */
  @property({ type: Boolean, attribute: 'enable-selection' })
  enableSelection = false;

  /** Enable sorting. */
  @property({ type: Boolean, attribute: 'enable-sorting' })
  enableSorting = true;

  /** Enable column filters. */
  @property({ type: Boolean, attribute: 'enable-filtering' })
  enableFiltering = false;

  /** Enable pagination. */
  @property({ type: Boolean, attribute: 'enable-pagination' })
  enablePagination = false;

  /** Page size when pagination is enabled. */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  /** Page size options for the selector dropdown. */
  @property({ attribute: false })
  pageSizeOptions: number[] = [10, 20, 30, 50, 100];

  /** Enable striped rows. */
  @property({ type: Boolean, reflect: true })
  striped = false;

  /** Global filter string. */
  @property({ attribute: false })
  globalFilter = '';

  /** Whether to show the header. */
  @property({ type: Boolean, attribute: 'no-header' })
  noHeader = false;

  @state() private _sorting: SortingState = [];
  @state() private _columnFilters: ColumnFiltersState = [];
  @state() private _columnVisibility: VisibilityState = {};
  @state() private _rowSelection: RowSelectionState = {};
  @state() private _pagination: PaginationState = { pageIndex: 0, pageSize: this.pageSize };
  @state() private _globalFilter = '';

  override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('pageSize')) {
      this._pagination = { ...this._pagination, pageSize: this.pageSize };
    }
    if (changed.has('globalFilter')) {
      this._globalFilter = this.globalFilter;
    }
  }

  private _updateState<S>(setter: (val: S) => void): OnChangeFn<S> {
    return (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setter((updaterOrValue as (old: S) => S)(undefined as unknown as S));
      } else {
        setter(updaterOrValue);
      }
    };
  }

  /** Get the TanStack table instance for advanced use. */
  getTable() {
    return this._createTable();
  }

  /** Get current row selection state. */
  getRowSelection(): RowSelectionState {
    return this._rowSelection;
  }

  /** Set column visibility programmatically. */
  setColumnVisibility(visibility: VisibilityState): void {
    this._columnVisibility = visibility;
  }

  /** Set global filter programmatically. */
  setGlobalFilter(filter: string): void {
    this._globalFilter = filter;
    this.globalFilter = filter;
  }

  private _createTable() {
    const options: TableOptions<T> = {
      columns: this.columns,
      data: this.data,
      state: {
        sorting: this._sorting,
        columnFilters: this._columnFilters,
        columnVisibility: this._columnVisibility,
        rowSelection: this._rowSelection,
        pagination: this._pagination,
        globalFilter: this._globalFilter,
      },
      enableRowSelection: this.enableSelection,
      enableSorting: this.enableSorting,
      enableColumnFilters: this.enableFiltering,
      onSortingChange: (updater) => {
        this._sorting = typeof updater === 'function' ? updater(this._sorting) : updater;
        this.dispatchEvent(new CustomEvent('bl-sort-change', {
          detail: { sorting: this._sorting },
          composed: true, bubbles: true,
        }));
      },
      onColumnFiltersChange: (updater) => {
        this._columnFilters = typeof updater === 'function' ? updater(this._columnFilters) : updater;
        this.dispatchEvent(new CustomEvent('bl-filter-change', {
          detail: { filters: this._columnFilters },
          composed: true, bubbles: true,
        }));
      },
      onColumnVisibilityChange: (updater) => {
        this._columnVisibility = typeof updater === 'function' ? updater(this._columnVisibility) : updater;
      },
      onRowSelectionChange: (updater) => {
        this._rowSelection = typeof updater === 'function' ? updater(this._rowSelection) : updater;
        this.dispatchEvent(new CustomEvent('bl-selection-change', {
          detail: { selection: this._rowSelection },
          composed: true, bubbles: true,
        }));
      },
      onPaginationChange: (updater) => {
        this._pagination = typeof updater === 'function' ? updater(this._pagination) : updater;
        this.dispatchEvent(new CustomEvent('bl-page-change', {
          detail: { pagination: this._pagination },
          composed: true, bubbles: true,
        }));
      },
      onGlobalFilterChange: (updater) => {
        this._globalFilter = typeof updater === 'function' ? updater(this._globalFilter) : updater;
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: this.enableSorting ? getSortedRowModel() : undefined,
      getFilteredRowModel: this.enableFiltering || this._globalFilter ? getFilteredRowModel() : undefined,
      getPaginationRowModel: this.enablePagination ? getPaginationRowModel() : undefined,
      getFacetedRowModel: this.enableFiltering ? getFacetedRowModel() : undefined,
      getFacetedUniqueValues: this.enableFiltering ? getFacetedUniqueValues() : undefined,
      getFacetedMinMaxValues: this.enableFiltering ? getFacetedMinMaxValues() : undefined,
    };

    return this._tableController.table(options);
  }

  private _handleRowClick(row: Row<T>): void {
    this.dispatchEvent(new CustomEvent('bl-row-click', {
      detail: { row: row.original, rowIndex: row.index, rowId: row.id },
      composed: true, bubbles: true,
    }));
  }

  private _renderSortIcon(sorted: false | 'asc' | 'desc') {
    if (sorted === 'asc') {
      return html`<svg class="sort-icon active" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 4 18 9"></polyline></svg>`;
    }
    if (sorted === 'desc') {
      return html`<svg class="sort-icon active desc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 4 18 9"></polyline></svg>`;
    }
    return html`<svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 4 18 9"></polyline><polyline points="18 15 12 20 6 15"></polyline></svg>`;
  }

  protected override render() {
    const table = this._createTable();
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;

    return html`
      <slot name="toolbar"></slot>
      <div class="table-wrapper" part="wrapper">
        <table class="table" part="table" role="grid">
          ${!this.noHeader ? html`
            <thead part="thead">
              ${headerGroups.map(headerGroup => html`
                <tr role="row">
                  ${headerGroup.headers.map(header => html`
                    <th
                      part="th"
                      role="columnheader"
                      aria-sort=${header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : 'none'}
                      class=${header.column.getCanSort() ? 'sortable' : ''}
                      style="width: ${header.getSize()}px"
                      @click=${header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    >
                      ${header.isPlaceholder ? nothing : html`
                        <div class="header-cell">
                          <span class="header-label">${flexRender(header.column.columnDef.header, header.getContext())}</span>
                          ${header.column.getCanSort() ? this._renderSortIcon(header.column.getIsSorted()) : nothing}
                        </div>
                      `}
                    </th>
                  `)}
                </tr>
              `)}
            </thead>
          ` : nothing}
          <tbody part="tbody">
            ${rows.length > 0
              ? rows.map((row, i) => html`
                  <tr
                    role="row"
                    class=${[
                      row.getIsSelected() ? 'selected' : '',
                      this.striped && i % 2 === 1 ? 'striped' : '',
                    ].filter(Boolean).join(' ')}
                    aria-selected=${row.getIsSelected() ? 'true' : 'false'}
                    @click=${() => this._handleRowClick(row)}
                  >
                    ${row.getVisibleCells().map(cell => html`
                      <td part="td" role="gridcell">
                        ${flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    `)}
                  </tr>
                `)
              : html`
                  <tr class="empty-row">
                    <td colspan=${table.getAllColumns().length} class="empty-cell">
                      <slot name="empty">
                        <div class="empty-state">No results.</div>
                      </slot>
                    </td>
                  </tr>
                `
            }
          </tbody>
        </table>
      </div>
      ${this.enablePagination ? html`
        <div class="pagination" part="pagination">
          <div class="pagination-info">
            <span class="row-count">
              ${table.getFilteredSelectedRowModel().rows.length > 0
                ? html`${table.getFilteredSelectedRowModel().rows.length} of `
                : nothing}
              ${table.getFilteredRowModel().rows.length} row(s)
            </span>
            <div class="page-size-selector">
              <span>Rows per page</span>
              <select
                @change=${(e: Event) => {
                  const val = Number((e.target as HTMLSelectElement).value);
                  table.setPageSize(val);
                }}
                .value=${String(this._pagination.pageSize)}
              >
                ${this.pageSizeOptions.map(size => html`
                  <option value=${size} ?selected=${this._pagination.pageSize === size}>${size}</option>
                `)}
              </select>
            </div>
          </div>
          <div class="pagination-controls">
            <span class="page-info">
              Page ${this._pagination.pageIndex + 1} of ${table.getPageCount()}
            </span>
            <div class="pagination-buttons">
              <button
                aria-label="First page"
                ?disabled=${!table.getCanPreviousPage()}
                @click=${() => table.firstPage()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
              </button>
              <button
                aria-label="Previous page"
                ?disabled=${!table.getCanPreviousPage()}
                @click=${() => table.previousPage()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button
                aria-label="Next page"
                ?disabled=${!table.getCanNextPage()}
                @click=${() => table.nextPage()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              <button
                aria-label="Last page"
                ?disabled=${!table.getCanNextPage()}
                @click=${() => table.lastPage()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-data-table': BlDataTable;
  }
}
