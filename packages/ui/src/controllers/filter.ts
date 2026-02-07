import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface FilterOptions {
  /** CSS selector for filterable items. */
  selector?: string;
  /** Filter mode. Default: 'includes' */
  mode?: 'includes' | 'startsWith' | ((itemText: string, query: string) => boolean);
  /** How to get text from items. Default: 'textContent' */
  textSelector?: 'textContent' | 'aria-label';
}

/**
 * Shared filtering logic for Combobox and Command Palette.
 * Toggles `hidden` on items based on a query string.
 */
export class FilterController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<FilterOptions>;
  private _query = '';

  constructor(host: ReactiveControllerHost & HTMLElement, options?: FilterOptions) {
    this._host = host;
    this._options = {
      selector: options?.selector ?? '[role="option"]',
      mode: options?.mode ?? 'includes',
      textSelector: options?.textSelector ?? 'textContent',
    };
    host.addController(this);
  }

  hostConnected(): void {}
  hostDisconnected(): void {}

  /** Current filter query. */
  get query(): string {
    return this._query;
  }

  /** Update the filter query and toggle item visibility. Returns the number of visible items. */
  filter(query: string): number {
    this._query = query;
    const items = this._getItems();
    const normalizedQuery = query.toLowerCase().trim();
    let visibleCount = 0;

    for (const item of items) {
      const text = this._getItemText(item);
      const matches = normalizedQuery === '' || this._matches(text, normalizedQuery);
      item.hidden = !matches;
      if (matches) visibleCount++;
    }

    return visibleCount;
  }

  /** Reset filter — show all items. */
  reset(): void {
    this._query = '';
    for (const item of this._getItems()) {
      item.hidden = false;
    }
  }

  /** Update the filter mode. */
  setMode(mode: FilterOptions['mode']): void {
    if (mode) this._options.mode = mode;
  }

  private _getItems(): HTMLElement[] {
    return Array.from(this._host.querySelectorAll<HTMLElement>(this._options.selector));
  }

  private _getItemText(item: HTMLElement): string {
    if (this._options.textSelector === 'aria-label') {
      return (item.getAttribute('aria-label') ?? item.textContent ?? '').trim().toLowerCase();
    }
    return (item.textContent ?? '').trim().toLowerCase();
  }

  private _matches(text: string, query: string): boolean {
    if (typeof this._options.mode === 'function') {
      return this._options.mode(text, query);
    }
    if (this._options.mode === 'startsWith') {
      return text.startsWith(query);
    }
    return text.includes(query);
  }
}
