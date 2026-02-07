import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface RovingTabindexOptions {
  /** Arrow key orientation. Default: 'vertical' */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Wrap around at ends. Default: true */
  loop?: boolean;
  /** CSS selector for focusable items. Default: '[role]' */
  selector?: string;
}

/**
 * Arrow key navigation within widget groups. Manages `tabindex` across children.
 * Follows the WAI-ARIA Composite pattern.
 */
export class RovingTabindexController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<RovingTabindexOptions>;
  private _handleKeyDown = this._onKeyDown.bind(this);
  private _currentIndex = 0;

  constructor(host: ReactiveControllerHost & HTMLElement, options?: RovingTabindexOptions) {
    this._host = host;
    this._options = {
      orientation: options?.orientation ?? 'vertical',
      loop: options?.loop ?? true,
      selector: options?.selector ?? '[role]',
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

  /** Returns the currently focused item index. */
  get currentIndex(): number {
    return this._currentIndex;
  }

  /** Programmatically set the active item by index. */
  setCurrentIndex(index: number): void {
    const items = this._getItems();
    if (index >= 0 && index < items.length) {
      this._currentIndex = index;
      this._updateTabindex(items);
    }
  }

  /** Returns the list of items managed by this controller. */
  getItems(): HTMLElement[] {
    return this._getItems();
  }

  private _getItems(): HTMLElement[] {
    return Array.from(this._host.querySelectorAll<HTMLElement>(this._options.selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
    );
  }

  private _initTabindex(): void {
    const items = this._getItems();
    if (items.length === 0) return;
    if (this._currentIndex >= items.length) {
      this._currentIndex = 0;
    }
    this._updateTabindex(items);
  }

  private _updateTabindex(items: HTMLElement[]): void {
    for (let i = 0; i < items.length; i++) {
      items[i]!.setAttribute('tabindex', i === this._currentIndex ? '0' : '-1');
    }
  }

  private _onFocusIn = (event: Event): void => {
    const target = event.target as HTMLElement;
    const items = this._getItems();
    const index = items.indexOf(target);
    if (index !== -1) {
      this._currentIndex = index;
      this._updateTabindex(items);
    }
  };

  private _onKeyDown(event: Event): void {
    const e = event as KeyboardEvent;
    const { orientation, loop } = this._options;

    const isNext =
      (orientation !== 'horizontal' && e.key === 'ArrowDown') ||
      (orientation !== 'vertical' && e.key === 'ArrowRight');

    const isPrev =
      (orientation !== 'horizontal' && e.key === 'ArrowUp') ||
      (orientation !== 'vertical' && e.key === 'ArrowLeft');

    const isFirst = e.key === 'Home';
    const isLast = e.key === 'End';

    if (!isNext && !isPrev && !isFirst && !isLast) return;

    e.preventDefault();
    const items = this._getItems();
    if (items.length === 0) return;

    let nextIndex = this._currentIndex;

    if (isNext) {
      nextIndex = this._currentIndex + 1;
      if (nextIndex >= items.length) {
        nextIndex = loop ? 0 : items.length - 1;
      }
    } else if (isPrev) {
      nextIndex = this._currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = loop ? items.length - 1 : 0;
      }
    } else if (isFirst) {
      nextIndex = 0;
    } else if (isLast) {
      nextIndex = items.length - 1;
    }

    this._currentIndex = nextIndex;
    this._updateTabindex(items);
    items[nextIndex]?.focus();
  }
}
