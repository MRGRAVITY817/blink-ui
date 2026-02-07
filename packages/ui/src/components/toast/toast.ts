import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { toastStyles } from './toast.styles.js';
import { AnimationController } from '../../controllers/animation.js';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';

/**
 * A single toast notification. Normally created by the `toast()` API.
 *
 * @element bl-toast
 * @slot - Toast message content.
 * @slot action - Action button content.
 * @csspart toast - The toast container.
 * @fires bl-toast-dismiss - Emitted when the toast is dismissed.
 */
@customElement('bl-toast')
export class BlToast extends LitElement {
  static override styles = [tokens, toastStyles];

  private _animation = new AnimationController(this, { enterDuration: 200, exitDuration: 150 });
  private _timer: ReturnType<typeof setTimeout> | null = null;

  /** Visual variant. */
  @property({ reflect: true })
  variant: ToastVariant = 'default';

  /** Auto-dismiss duration in ms. 0 disables auto-dismiss. */
  @property({ type: Number })
  duration = 5000;

  /** The toast message. Can also be set via default slot. */
  @property()
  message = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._pauseTimer);
    this.addEventListener('mouseleave', this._resumeTimer);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimer();
    this.removeEventListener('mouseenter', this._pauseTimer);
    this.removeEventListener('mouseleave', this._resumeTimer);
  }

  /** Animate the toast in and start the auto-dismiss timer. */
  async show(): Promise<void> {
    await this.updateComplete;
    const surface = this.shadowRoot!.querySelector<HTMLElement>('.toast');
    if (surface) {
      await this._animation.enter(surface);
    }
    this._startTimer();
  }

  /** Animate the toast out and remove it. */
  async dismiss(): Promise<void> {
    this._clearTimer();
    const surface = this.shadowRoot!.querySelector<HTMLElement>('.toast');
    if (surface) {
      await this._animation.exit(surface);
    }
    this.dispatchEvent(
      new CustomEvent('bl-toast-dismiss', { composed: true, bubbles: true }),
    );
    this.remove();
  }

  private _startTimer(): void {
    if (this.duration > 0) {
      this._timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  private _clearTimer(): void {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private _pauseTimer = (): void => {
    this._clearTimer();
  };

  private _resumeTimer = (): void => {
    this._startTimer();
  };

  private _handleClose = (): void => {
    this.dismiss();
  };

  protected override render() {
    return html`
      <div class="toast" part="toast" role="status">
        <div class="toast-content">
          ${this.message || html`<slot></slot>`}
        </div>
        <div class="toast-action">
          <slot name="action"></slot>
        </div>
        <button
          class="toast-close"
          part="close"
          aria-label="Dismiss"
          @click=${this._handleClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-toast': BlToast;
  }
}
