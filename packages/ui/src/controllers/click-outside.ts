import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface ClickOutsideOptions {
  /** Called when a click occurs outside the host element. */
  onClickOutside: () => void;
  /** Enable/disable the listener. Default: true */
  active?: boolean;
}

/**
 * Detects clicks outside an element. Used by Popover, Dropdown, etc.
 */
export class ClickOutsideController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<ClickOutsideOptions>;
  private _handlePointerDown = this._onPointerDown.bind(this);

  active: boolean;

  constructor(host: ReactiveControllerHost & HTMLElement, options: ClickOutsideOptions) {
    this._host = host;
    this._options = {
      onClickOutside: options.onClickOutside,
      active: options.active ?? true,
    };
    this.active = this._options.active;
    host.addController(this);
  }

  hostConnected(): void {
    if (this.active) this._addListener();
  }

  hostDisconnected(): void {
    this._removeListener();
  }

  hostUpdated(): void {
    if (this.active) {
      this._addListener();
    } else {
      this._removeListener();
    }
  }

  private _addListener(): void {
    document.addEventListener('pointerdown', this._handlePointerDown, true);
  }

  private _removeListener(): void {
    document.removeEventListener('pointerdown', this._handlePointerDown, true);
  }

  private _onPointerDown(event: PointerEvent): void {
    if (!this.active) return;
    const path = event.composedPath();
    if (!path.includes(this._host)) {
      this._options.onClickOutside();
    }
  }
}
