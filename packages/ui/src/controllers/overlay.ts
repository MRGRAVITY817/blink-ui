import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
  arrow,
  size,
  type Placement,
  type VirtualElement,
} from '@floating-ui/dom';

export interface OverlayOptions {
  /** Preferred placement relative to reference. Default: 'bottom' */
  placement?: Placement;
  /** Offset in pixels from the reference. Default: 8 */
  offset?: number;
  /** Enable automatic flip when clipped. Default: true */
  flip?: boolean;
  /** Enable shift along the axis to stay in view. Default: true */
  shift?: boolean;
  /** CSS selector for the arrow element within the floating element. */
  arrowSelector?: string;
  /** Match the floating element width to the reference. Default: false */
  matchWidth?: boolean;
}

/**
 * Wraps Floating UI for viewport-aware positioning of overlay elements.
 * Used by Tooltip, Popover, Select, Menu, etc.
 */
export class OverlayController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<OverlayOptions>;
  private _cleanup: (() => void) | null = null;

  /** The resolved placement after flip/shift adjustments. */
  currentPlacement: Placement;

  constructor(host: ReactiveControllerHost & HTMLElement, options?: OverlayOptions) {
    this._host = host;
    this._options = {
      placement: options?.placement ?? 'bottom',
      offset: options?.offset ?? 8,
      flip: options?.flip ?? true,
      shift: options?.shift ?? true,
      arrowSelector: options?.arrowSelector ?? '',
      matchWidth: options?.matchWidth ?? false,
    };
    this.currentPlacement = this._options.placement;
    host.addController(this);
  }

  hostConnected(): void {}
  hostDisconnected(): void {
    this.hide();
  }

  /** Start auto-updating position of the floating element relative to the reference. */
  show(reference: HTMLElement | VirtualElement, floating: HTMLElement): void {
    this.hide();

    const middleware = [offset(this._options.offset)];

    if (this._options.flip) {
      middleware.push(flip({ padding: 8 }));
    }
    if (this._options.shift) {
      middleware.push(shift({ padding: 8 }));
    }
    if (this._options.matchWidth) {
      middleware.push(
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      );
    }

    const arrowEl = this._options.arrowSelector
      ? floating.querySelector<HTMLElement>(this._options.arrowSelector)
      : null;
    if (arrowEl) {
      middleware.push(arrow({ element: arrowEl }));
    }

    this._cleanup = autoUpdate(reference as Element, floating, () => {
      computePosition(reference as Element, floating, {
        placement: this._options.placement,
        middleware,
      }).then(({ x, y, placement, middlewareData }) => {
        this.currentPlacement = placement;
        floating.setAttribute('data-placement', placement);

        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (arrowEl && middlewareData.arrow) {
          const { x: ax, y: ay } = middlewareData.arrow;
          const side = placement.split('-')[0]!;
          const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
            side
          ]!;

          Object.assign(arrowEl.style, {
            left: ax != null ? `${ax}px` : '',
            top: ay != null ? `${ay}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
        }
      });
    });
  }

  /** Stop positioning and clean up. */
  hide(): void {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }

  /** Force an immediate reposition. */
  reposition(): void {
    // autoUpdate handles this, but you can trigger via show() again if needed
  }

  /** Update placement option. */
  setPlacement(placement: Placement): void {
    this._options.placement = placement;
  }

  /** Update offset option. */
  setOffset(value: number): void {
    this._options.offset = value;
  }
}
