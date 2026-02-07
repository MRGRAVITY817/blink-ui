import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface FilterOptions {
  /** CSS selector for filterable items. */
  selector?: string;
  /** Filter mode. Default: 'includes' */
  mode?: 'includes' | 'startsWith' | 'scored' | ((itemText: string, query: string) => boolean);
  /** How to get text from items. Default: 'textContent' */
  textSelector?: 'textContent' | 'aria-label';
  /** Attribute name for keywords on items. */
  keywordsAttr?: string;
}

export interface FilterResult {
  item: HTMLElement;
  score: number;
}

/**
 * Shared filtering logic for Combobox and Command Palette.
 * Toggles `hidden` on items based on a query string.
 * Supports scored ranking mode for relevance-sorted results.
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
      keywordsAttr: options?.keywordsAttr ?? 'keywords',
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

    if (this._options.mode === 'scored') {
      return this._scoredFilter(items, normalizedQuery);
    }

    for (const item of items) {
      const text = this._getItemText(item);
      const keywords = this._getKeywords(item);
      const matchesText = normalizedQuery === '' || this._matches(text, normalizedQuery);
      const matchesKeywords = keywords.some(kw => this._matches(kw, normalizedQuery));
      const matches = matchesText || matchesKeywords;

      if (item.hasAttribute('force-mount')) {
        item.hidden = false;
      } else {
        item.hidden = !matches;
      }
      if (matches) visibleCount++;
    }

    return visibleCount;
  }

  /** Filter with scoring — returns scored results sorted by relevance. */
  filterScored(query: string): FilterResult[] {
    this._query = query;
    const items = this._getItems();
    const normalizedQuery = query.toLowerCase().trim();
    const results: FilterResult[] = [];

    if (normalizedQuery === '') {
      for (const item of items) {
        item.hidden = false;
        results.push({ item, score: 1 });
      }
      return results;
    }

    for (const item of items) {
      const text = this._getItemText(item);
      const keywords = this._getKeywords(item);
      const score = this._score(text, keywords, normalizedQuery);

      if (item.hasAttribute('force-mount')) {
        item.hidden = false;
        results.push({ item, score: score > 0 ? score : 0 });
      } else if (score > 0) {
        item.hidden = false;
        results.push({ item, score });
      } else {
        item.hidden = true;
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results;
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

  private _scoredFilter(items: HTMLElement[], query: string): number {
    if (query === '') {
      for (const item of items) item.hidden = false;
      return items.length;
    }

    const scored: { item: HTMLElement; score: number }[] = [];
    for (const item of items) {
      const text = this._getItemText(item);
      const keywords = this._getKeywords(item);
      const score = this._score(text, keywords, query);

      if (item.hasAttribute('force-mount')) {
        item.hidden = false;
        scored.push({ item, score });
      } else if (score > 0) {
        item.hidden = false;
        scored.push({ item, score });
      } else {
        item.hidden = true;
      }
    }

    // Re-order DOM based on score
    scored.sort((a, b) => b.score - a.score);
    const parent = scored[0]?.item.parentElement;
    if (parent) {
      for (const { item } of scored) {
        parent.appendChild(item);
      }
    }

    return scored.length;
  }

  private _score(text: string, keywords: string[], query: string): number {
    let bestScore = 0;

    // Score main text
    const textScore = this._scoreText(text, query);
    bestScore = Math.max(bestScore, textScore);

    // Score keywords (at a slight discount)
    for (const kw of keywords) {
      const kwScore = this._scoreText(kw, query) * 0.8;
      bestScore = Math.max(bestScore, kwScore);
    }

    return bestScore;
  }

  private _scoreText(text: string, query: string): number {
    if (!text || !query) return 0;

    // Exact match
    if (text === query) return 1;

    // Starts with
    if (text.startsWith(query)) return 0.9;

    // Contains
    if (text.includes(query)) {
      // Boost for word boundary matches
      const idx = text.indexOf(query);
      if (idx === 0 || text[idx - 1] === ' ' || text[idx - 1] === '-' || text[idx - 1] === '_') {
        return 0.8;
      }
      return 0.6;
    }

    // Fuzzy char-by-char match
    let qi = 0;
    for (let ti = 0; ti < text.length && qi < query.length; ti++) {
      if (text[ti] === query[qi]) qi++;
    }
    if (qi === query.length) {
      return 0.3 * (query.length / text.length);
    }

    return 0;
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

  private _getKeywords(item: HTMLElement): string[] {
    const attr = item.getAttribute(this._options.keywordsAttr);
    if (!attr) return [];
    return attr.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
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
