import { css } from 'lit';

export const dataTableStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    overflow: hidden;
  }

  .table-wrapper {
    overflow: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bl-font-size-sm);
  }

  /* ---- Header ---- */
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th {
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    text-align: left;
    font-weight: 600;
    font-size: var(--bl-font-size-xs);
    color: var(--bl-color-neutral-600);
    background-color: var(--bl-color-neutral-50);
    border-bottom: 1px solid var(--bl-color-neutral-200);
    white-space: nowrap;
    user-select: none;
  }

  th.sortable {
    cursor: pointer;
  }

  th.sortable:hover {
    color: var(--bl-color-neutral-900);
  }

  .header-cell {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
  }

  .header-label {
    flex: 1;
    min-width: 0;
  }

  .sort-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.3;
    transition: opacity var(--bl-transition-fast), transform var(--bl-transition-fast);
  }

  .sort-icon.active {
    opacity: 1;
    color: var(--bl-color-primary-600);
  }

  .sort-icon.desc {
    transform: rotate(180deg);
  }

  /* ---- Body ---- */
  tbody tr {
    transition: background-color var(--bl-transition-fast);
    border-bottom: 1px solid var(--bl-color-neutral-100);
  }

  tbody tr:last-child {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: var(--bl-color-neutral-50);
  }

  tbody tr.selected {
    background-color: var(--bl-color-primary-50);
  }

  :host([striped]) tbody tr.striped {
    background-color: var(--bl-color-neutral-50);
  }

  :host([striped]) tbody tr.striped:hover {
    background-color: var(--bl-color-neutral-100);
  }

  td {
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    color: var(--bl-color-neutral-700);
    vertical-align: middle;
  }

  /* ---- Empty ---- */
  .empty-cell {
    text-align: center;
    padding: var(--bl-spacing-xl) var(--bl-spacing-md);
  }

  .empty-state {
    color: var(--bl-color-neutral-400);
    font-size: var(--bl-font-size-sm);
  }

  /* ---- Pagination ---- */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    border-top: 1px solid var(--bl-color-neutral-200);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-600);
    gap: var(--bl-spacing-md);
  }

  .pagination-info {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-lg);
  }

  .page-size-selector {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
  }

  .page-size-selector select {
    padding: 4px 8px;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-sm);
    background: white;
    font-size: var(--bl-font-size-xs);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
  }

  .page-size-selector select:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-md);
  }

  .page-info {
    min-width: 100px;
    text-align: center;
    white-space: nowrap;
  }

  .pagination-buttons {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
  }

  .pagination button,
  .pagination-buttons button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .pagination button:hover:not(:disabled),
  .pagination-buttons button:hover:not(:disabled) {
    background-color: var(--bl-color-neutral-100);
    border-color: var(--bl-color-neutral-300);
  }

  .pagination button:disabled,
  .pagination-buttons button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pagination button:focus-visible,
  .pagination-buttons button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  /* ---- Toolbar slot ---- */
  ::slotted([slot='toolbar']) {
    display: block;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }
`;

// Keep backward compat for sub-components that still exist but are now internal
export const tableHeaderStyles = css`
  :host {
    display: table-header-group;
  }
`;

export const tableBodyStyles = css`
  :host {
    display: table-row-group;
  }
`;

export const tableRowStyles = css`
  :host {
    display: table-row;
    transition: background-color var(--bl-transition-fast);
  }

  :host(:hover) {
    background-color: var(--bl-color-neutral-50);
  }

  :host([selected]) {
    background-color: var(--bl-color-primary-50);
  }

  :host(:not(:last-child)) {
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }
`;

export const tableHeaderCellStyles = css`
  :host {
    display: table-cell;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    text-align: left;
    font-weight: 600;
    font-size: var(--bl-font-size-xs);
    color: var(--bl-color-neutral-600);
    background-color: var(--bl-color-neutral-50);
    border-bottom: 1px solid var(--bl-color-neutral-200);
    white-space: nowrap;
    user-select: none;
  }

  .header-cell {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
  }

  :host([sortable]) .header-cell {
    cursor: pointer;
  }

  :host([sortable]) .header-cell:hover {
    color: var(--bl-color-neutral-900);
  }

  .sort-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.3;
    transition: opacity var(--bl-transition-fast);
  }

  :host([aria-sort='ascending']) .sort-icon,
  :host([aria-sort='descending']) .sort-icon {
    opacity: 1;
    color: var(--bl-color-primary-600);
  }

  :host([aria-sort='descending']) .sort-icon {
    transform: rotate(180deg);
  }

  :host(:focus-visible) {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }
`;

export const tableCellStyles = css`
  :host {
    display: table-cell;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    color: var(--bl-color-neutral-700);
    vertical-align: middle;
  }

  :host(:focus-visible) {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }
`;

export const tablePaginationStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    border-top: 1px solid var(--bl-color-neutral-200);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-600);
  }

  .info {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  button:hover:not(:disabled) {
    background-color: var(--bl-color-neutral-100);
    border-color: var(--bl-color-neutral-300);
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .page-info {
    min-width: 100px;
    text-align: center;
  }
`;

export const tableToolbarStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  .toolbar-start {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    flex: 1;
    min-width: 0;
  }

  .toolbar-end {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    flex-shrink: 0;
  }

  .search-input {
    height: 32px;
    padding: 0 var(--bl-spacing-sm);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    font-size: var(--bl-font-size-sm);
    font-family: var(--bl-font-family-base);
    background: white;
    color: var(--bl-color-neutral-900);
    min-width: 200px;
    transition: border-color var(--bl-transition-fast);
  }

  .search-input::placeholder {
    color: var(--bl-color-neutral-400);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const tableColumnVisibilityStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--bl-font-family-base);
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
    height: 32px;
    padding: 0 var(--bl-spacing-sm);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    background: white;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .trigger:hover {
    background-color: var(--bl-color-neutral-50);
    border-color: var(--bl-color-neutral-300);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 180px;
    background: white;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-md);
    padding: var(--bl-spacing-xs);
    z-index: var(--bl-z-dropdown);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-sm);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
    user-select: none;
  }

  .dropdown-item:hover {
    background-color: var(--bl-color-neutral-50);
  }

  .dropdown-item input[type='checkbox'] {
    accent-color: var(--bl-color-primary-600);
  }
`;

export const tableFacetedFilterStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--bl-font-family-base);
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
    height: 32px;
    padding: 0 var(--bl-spacing-sm);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    background: white;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .trigger:hover {
    background-color: var(--bl-color-neutral-50);
    border-color: var(--bl-color-neutral-300);
  }

  .trigger.active {
    border-color: var(--bl-color-primary-300);
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: var(--bl-radius-full);
    background-color: var(--bl-color-primary-100);
    color: var(--bl-color-primary-700);
    font-size: 11px;
    font-weight: 600;
  }

  .separator {
    width: 1px;
    height: 16px;
    background-color: var(--bl-color-neutral-200);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 220px;
    background: white;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-md);
    z-index: var(--bl-z-dropdown);
    overflow: hidden;
  }

  .filter-search {
    padding: var(--bl-spacing-xs);
    border-bottom: 1px solid var(--bl-color-neutral-100);
  }

  .filter-search input {
    width: 100%;
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-sm);
    font-size: var(--bl-font-size-sm);
    font-family: var(--bl-font-family-base);
    color: var(--bl-color-neutral-900);
  }

  .filter-search input:focus {
    outline: none;
    border-color: var(--bl-color-primary-500);
  }

  .filter-search input::placeholder {
    color: var(--bl-color-neutral-400);
  }

  .filter-list {
    max-height: 200px;
    overflow-y: auto;
    padding: var(--bl-spacing-xs);
  }

  .filter-option {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-sm);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
    user-select: none;
  }

  .filter-option:hover {
    background-color: var(--bl-color-neutral-50);
  }

  .filter-option .check {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-xs);
    flex-shrink: 0;
  }

  .filter-option .check.checked {
    background-color: var(--bl-color-primary-600);
    border-color: var(--bl-color-primary-600);
    color: white;
  }

  .filter-option .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .filter-option .option-count {
    font-size: var(--bl-font-size-xs);
    color: var(--bl-color-neutral-400);
    flex-shrink: 0;
  }

  .filter-footer {
    padding: var(--bl-spacing-xs);
    border-top: 1px solid var(--bl-color-neutral-100);
    display: flex;
    justify-content: center;
  }

  .clear-button {
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    border: none;
    background: none;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    border-radius: var(--bl-radius-sm);
  }

  .clear-button:hover {
    background-color: var(--bl-color-neutral-50);
    color: var(--bl-color-neutral-900);
  }
`;
