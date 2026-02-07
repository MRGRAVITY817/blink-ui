import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface TypeaheadOptions {
  /** CSS selector for searchable items. */
  selector?: string;
  /** How to get text from items. Default: 'textContent' */
  textSelector?: 'textContent' | 'aria-label';
  /** Reset buffer timeout in ms. Default: 500 */
  timeout?: number;
  /** Called when a match is found. */
  onMatch?: (item: HTMLElement, index: number) => void;
}

/**
 * Type-to-search within a list/menu. Attaches to any composite widget.
 */
export class TypeaheadController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<TypeaheadOptions>;
  private _buffer = '';
  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _handleKeyDown = this._onKeyDown.bind(this);

  constructor(host: ReactiveControllerHost & HTMLElement, options?: TypeaheadOptions) {
    this._host = host;
    this._options = {
      selector: options?.selector ?? '[role]',
      textSelector: options?.textSelector ?? 'textContent',
      timeout: options?.timeout ?? 500,
      onMatch: options?.onMatch ?? (() => {}),
    };
    host.addController(this);
  }

  hostConnected(): void {
    this._host.addEventListener('keydown', this._handleKeyDown);
  }

  hostDisconnected(): void {
    this._host.removeEventListener('keydown', this._handleKeyDown);
    this._clearTimer();
  }

  private _clearTimer(): void {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private _getItems(): HTMLElement[] {
    return Array.from(this._host.querySelectorAll<HTMLElement>(this._options.selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
    );
  }

  private _getItemText(item: HTMLElement): string {
    if (this._options.textSelector === 'aria-label') {
      return (item.getAttribute('aria-label') ?? item.textContent ?? '').trim().toLowerCase();
    }
    return (item.textContent ?? '').trim().toLowerCase();
  }

  private _onKeyDown(event: Event): void {
    const e = event as KeyboardEvent;

    // Only match printable single characters
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;

    e.preventDefault();
    this._buffer += e.key.toLowerCase();
    this._clearTimer();
    this._timer = setTimeout(() => {
      this._buffer = '';
    }, this._options.timeout);

    const items = this._getItems();
    const match = items.findIndex((item) =>
      this._getItemText(item).startsWith(this._buffer),
    );

    if (match !== -1) {
      this._options.onMatch(items[match]!, match);
    }
  }
}
