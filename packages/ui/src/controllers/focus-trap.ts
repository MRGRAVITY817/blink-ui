import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface FocusTrapOptions {
  /** Enable/disable the trap reactively. */
  active?: boolean;
  /** Return focus to the previously-focused element on deactivation. Default: true */
  returnFocusOnDeactivate?: boolean;
  /** CSS selector for the element that should receive initial focus. */
  initialFocus?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Contains tab focus within a host element. Used by Dialog, Popover, etc.
 */
export class FocusTrapController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<FocusTrapOptions>;
  private _previousFocus: HTMLElement | null = null;
  private _handleKeyDown = this._onKeyDown.bind(this);

  active: boolean;

  constructor(host: ReactiveControllerHost & HTMLElement, options?: FocusTrapOptions) {
    this._host = host;
    this._options = {
      active: options?.active ?? false,
      returnFocusOnDeactivate: options?.returnFocusOnDeactivate ?? true,
      initialFocus: options?.initialFocus ?? '',
    };
    this.active = this._options.active;
    host.addController(this);
  }

  hostConnected(): void {
    if (this.active) this._activate();
  }

  hostDisconnected(): void {
    this._deactivate();
  }

  hostUpdated(): void {
    if (this.active) {
      this._activate();
    } else {
      this._deactivate();
    }
  }

  private _activate(): void {
    this._previousFocus ??= document.activeElement as HTMLElement | null;
    this._host.addEventListener('keydown', this._handleKeyDown);

    // Move focus into the trap on next frame
    requestAnimationFrame(() => {
      if (!this.active) return;
      const initial = this._options.initialFocus
        ? this._host.shadowRoot?.querySelector<HTMLElement>(this._options.initialFocus) ??
          this._host.querySelector<HTMLElement>(this._options.initialFocus)
        : null;
      if (initial) {
        initial.focus();
      } else {
        this._getFocusableElements()[0]?.focus();
      }
    });
  }

  private _deactivate(): void {
    this._host.removeEventListener('keydown', this._handleKeyDown);
    if (this._options.returnFocusOnDeactivate && this._previousFocus) {
      this._previousFocus.focus();
      this._previousFocus = null;
    }
  }

  private _onKeyDown(event: Event): void {
    const e = event as KeyboardEvent;
    if (e.key !== 'Tab') return;

    const focusable = this._getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  private _getFocusableElements(): HTMLElement[] {
    const root = this._host.shadowRoot ?? this._host;
    const slotted = this._host.querySelectorAll<HTMLElement>(FOCUSABLE);
    const shadow = root.querySelectorAll<HTMLElement>(FOCUSABLE);
    return [...Array.from(shadow), ...Array.from(slotted)].filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
    );
  }
}
