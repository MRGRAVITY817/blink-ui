import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { toastRegionStyles } from './toast-region.styles.js';
import { announce } from '../../primitives/live-announce/live-announce.js';
import type { BlToast, ToastVariant } from './toast.js';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  /** Visual variant. */
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms. */
  duration?: number;
  /** Action button label. */
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Global toast manager singleton
let _defaultRegion: BlToastRegion | null = null;

/**
 * Imperative toast API. Shows a toast in the default (or first) toast region.
 *
 * @example
 * ```js
 * import { toast } from '@blink-ui/components/toast';
 * toast('File saved successfully', { variant: 'success' });
 * ```
 */
export function toast(message: string, options?: ToastOptions): void {
  if (!_defaultRegion) {
    // Auto-create a default region if none exists
    _defaultRegion = document.createElement('bl-toast-region') as BlToastRegion;
    document.body.appendChild(_defaultRegion);
  }
  _defaultRegion.addToast(message, options);
}

/**
 * A container region for toast notifications.
 *
 * @element bl-toast-region
 * @slot - Toasts are appended here dynamically.
 */
@customElement('bl-toast-region')
export class BlToastRegion extends LitElement {
  static override styles = [tokens, toastRegionStyles];

  /** Position of the toast region. */
  @property({ reflect: true })
  position: ToastPosition = 'top-right';

  /** Maximum number of visible toasts. */
  @property({ type: Number })
  max = 5;

  private _toasts: BlToast[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-live', 'polite');
    this.setAttribute('aria-label', 'Notifications');

    // Register as default region
    if (!_defaultRegion) {
      _defaultRegion = this;
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (_defaultRegion === this) {
      _defaultRegion = null;
    }
  }

  /** Programmatically add a toast. */
  async addToast(message: string, options?: ToastOptions): Promise<void> {
    // Respect max visible count
    while (this._toasts.length >= this.max) {
      const oldest = this._toasts.shift();
      oldest?.dismiss();
    }

    // Import dynamically to avoid circular reference at module level
    const toastEl = document.createElement('bl-toast') as BlToast;
    toastEl.message = message;
    if (options?.variant) toastEl.variant = options.variant;
    if (options?.duration !== undefined) toastEl.duration = options.duration;

    toastEl.addEventListener('bl-toast-dismiss', () => {
      const idx = this._toasts.indexOf(toastEl);
      if (idx !== -1) this._toasts.splice(idx, 1);
    });

    if (options?.action) {
      const btn = document.createElement('button');
      btn.textContent = options.action.label;
      btn.slot = 'action';
      btn.style.cssText =
        'background:none;border:none;color:var(--bl-color-primary-600);cursor:pointer;font-size:var(--bl-font-size-sm);font-weight:500;padding:0;';
      btn.addEventListener('click', () => {
        options.action!.onClick();
        toastEl.dismiss();
      });
      toastEl.appendChild(btn);
    }

    this._toasts.push(toastEl);

    const list = this.shadowRoot!.querySelector('.toast-list');
    list?.appendChild(toastEl);

    // Announce for screen readers
    announce(message, 'polite');

    // Trigger enter animation
    await toastEl.show();
  }

  protected override render() {
    return html`<div class="toast-list"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-toast-region': BlToastRegion;
  }
}
