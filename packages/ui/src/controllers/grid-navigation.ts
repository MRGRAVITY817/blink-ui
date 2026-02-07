import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface GridNavigationOptions {
  /** CSS selector for rows. Default: '[role="row"]' */
  rowSelector?: string;
  /** CSS selector for cells within a row. Default: '[role="gridcell"], [role="columnheader"]' */
  cellSelector?: string;
  /** Wrap around at ends. Default: true */
  loop?: boolean;
}

/**
 * 2D arrow key navigation for `role="grid"` widgets.
 * Extends the RovingTabindexController concept into rows × columns.
 */
export class GridNavigationController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<GridNavigationOptions>;
  private _handleKeyDown = this._onKeyDown.bind(this);
  private _rowIndex = 0;
  private _colIndex = 0;

  constructor(host: ReactiveControllerHost & HTMLElement, options?: GridNavigationOptions) {
    this._host = host;
    this._options = {
      rowSelector: options?.rowSelector ?? '[role="row"]',
      cellSelector: options?.cellSelector ?? '[role="gridcell"], [role="columnheader"]',
      loop: options?.loop ?? true,
    };
    host.addController(this);
  }

  hostConnected(): void {
    this._host.addEventListener('keydown', this._handleKeyDown);
    this._host.addEventListener('focusin', this._onFocusIn.bind(this));
    requestAnimationFrame(() => this._initTabindex());
  }

  hostDisconnected(): void {
    this._host.removeEventListener('keydown', this._handleKeyDown);
  }

  hostUpdated(): void {
    this._initTabindex();
  }

  /** Current focused row index. */
  get rowIndex(): number {
    return this._rowIndex;
  }

  /** Current focused column index. */
  get colIndex(): number {
    return this._colIndex;
  }

  /** Programmatically set the active cell. */
  setCurrentCell(row: number, col: number): void {
    const rows = this._getRows();
    if (row >= 0 && row < rows.length) {
      const cells = this._getCells(rows[row]!);
      if (col >= 0 && col < cells.length) {
        this._rowIndex = row;
        this._colIndex = col;
        this._updateTabindex();
      }
    }
  }

  private _getRows(): HTMLElement[] {
    return Array.from(this._host.querySelectorAll<HTMLElement>(this._options.rowSelector));
  }

  private _getCells(row: HTMLElement): HTMLElement[] {
    return Array.from(row.querySelectorAll<HTMLElement>(this._options.cellSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
    );
  }

  private _initTabindex(): void {
    const rows = this._getRows();
    if (rows.length === 0) return;
    if (this._rowIndex >= rows.length) this._rowIndex = 0;
    const cells = this._getCells(rows[this._rowIndex]!);
    if (this._colIndex >= cells.length) this._colIndex = 0;
    this._updateTabindex();
  }

  private _updateTabindex(): void {
    const rows = this._getRows();
    for (let r = 0; r < rows.length; r++) {
      const cells = this._getCells(rows[r]!);
      for (let c = 0; c < cells.length; c++) {
        cells[c]!.setAttribute(
          'tabindex',
          r === this._rowIndex && c === this._colIndex ? '0' : '-1',
        );
      }
    }
  }

  private _onFocusIn = (event: Event): void => {
    const target = event.target as HTMLElement;
    const rows = this._getRows();
    for (let r = 0; r < rows.length; r++) {
      const cells = this._getCells(rows[r]!);
      const c = cells.indexOf(target);
      if (c !== -1) {
        this._rowIndex = r;
        this._colIndex = c;
        this._updateTabindex();
        return;
      }
    }
  };

  private _onKeyDown(event: Event): void {
    const e = event as KeyboardEvent;
    const rows = this._getRows();
    if (rows.length === 0) return;

    const { loop } = this._options;
    let newRow = this._rowIndex;
    let newCol = this._colIndex;
    let handled = false;

    const currentCells = this._getCells(rows[newRow]!);

    switch (e.key) {
      case 'ArrowRight':
        newCol++;
        if (newCol >= currentCells.length) {
          newCol = loop ? 0 : currentCells.length - 1;
        }
        handled = true;
        break;
      case 'ArrowLeft':
        newCol--;
        if (newCol < 0) {
          newCol = loop ? currentCells.length - 1 : 0;
        }
        handled = true;
        break;
      case 'ArrowDown':
        newRow++;
        if (newRow >= rows.length) {
          newRow = loop ? 0 : rows.length - 1;
        }
        handled = true;
        break;
      case 'ArrowUp':
        newRow--;
        if (newRow < 0) {
          newRow = loop ? rows.length - 1 : 0;
        }
        handled = true;
        break;
      case 'Home':
        if (e.ctrlKey) {
          newRow = 0;
          newCol = 0;
        } else {
          newCol = 0;
        }
        handled = true;
        break;
      case 'End':
        if (e.ctrlKey) {
          newRow = rows.length - 1;
          const lastRowCells = this._getCells(rows[newRow]!);
          newCol = lastRowCells.length - 1;
        } else {
          newCol = currentCells.length - 1;
        }
        handled = true;
        break;
    }

    if (!handled) return;

    e.preventDefault();

    // Clamp column to the new row's cell count
    const targetCells = this._getCells(rows[newRow]!);
    if (newCol >= targetCells.length) newCol = targetCells.length - 1;
    if (newCol < 0) newCol = 0;

    this._rowIndex = newRow;
    this._colIndex = newCol;
    this._updateTabindex();
    targetCells[newCol]?.focus();
  }
}
