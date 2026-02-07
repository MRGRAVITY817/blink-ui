import { css } from 'lit';

export const dataTableStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    overflow: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bl-font-size-sm);
  }
`;

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
