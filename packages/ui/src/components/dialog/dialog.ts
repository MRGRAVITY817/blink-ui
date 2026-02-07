import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { dialogStyles } from './dialog.styles.js';
import { FocusTrapController } from '../../controllers/focus-trap.js';
import { AnimationController } from '../../controllers/animation.js';

/**
 * A modal dialog with backdrop, focus trap, and close controls.
 *
 * @element bl-dialog
 * @slot header - Dialog title/header content.
 * @slot - Default slot for body content.
 * @slot footer - Dialog footer (usually action buttons).
 * @fires bl-dialog-show - Emitted when the dialog opens.
 * @fires bl-dialog-hide - Emitted when the dialog closes.
 * @fires bl-dialog-request-close - Emitted when close is requested; call preventDefault() to block.
 */
@customElement('bl-dialog')
export class BlDialog extends LitElement {
  static override styles = [tokens, dialogStyles];

  private _focusTrap = new FocusTrapController(this, { active: false });
  private _animation = new AnimationController(this);

  /** Whether the dialog is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Accessible label for the dialog. */
  @property()
  label = '';

  /** Whether pressing Escape closes the dialog. Default: true */
  @property({ type: Boolean, attribute: 'close-on-escape' })
  closeOnEscape = true;

  /** Whether clicking the overlay closes the dialog. Default: true */
  @property({ type: Boolean, attribute: 'close-on-overlay-click' })
  closeOnOverlayClick = true;

  /** Whether to prevent closing (hides close button, disables Escape/overlay close). */
  @property({ type: Boolean, attribute: 'prevent-close' })
  preventClose = false;

  @state()
  private _visible = false;

  private _inertElements: { el: Element; prev: string | null }[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this._restoreInert();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._show();
      } else if (this._visible) {
        this._hide();
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open && this.closeOnEscape && !this.preventClose) {
      e.preventDefault();
      e.stopPropagation();
      this._requestClose();
    }
  };

  private _handleOverlayClick = (): void => {
    if (this.closeOnOverlayClick && !this.preventClose) {
      this._requestClose();
    }
  };

  private _handleCloseClick = (): void => {
    this._requestClose();
  };

  private _requestClose(): void {
    const event = new CustomEvent('bl-dialog-request-close', {
      composed: true,
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.open = false;
    }
  }

  private async _show(): Promise<void> {
    if (this._visible) return;
    this._visible = true;
    this._applyInert();
    await this.updateComplete;

    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    const dialog = this.shadowRoot!.querySelector<HTMLElement>('.dialog');

    if (backdrop) this._animation.enter(backdrop);
    if (dialog) this._animation.enter(dialog);

    this._focusTrap.active = true;

    this.dispatchEvent(new CustomEvent('bl-dialog-show', { composed: true, bubbles: true }));
  }

  private async _hide(): Promise<void> {
    if (!this._visible) return;

    this._focusTrap.active = false;

    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    const dialog = this.shadowRoot!.querySelector<HTMLElement>('.dialog');

    const promises: Promise<void>[] = [];
    if (dialog) promises.push(this._animation.exit(dialog));
    if (backdrop) promises.push(this._animation.exit(backdrop));
    await Promise.all(promises);

    this._visible = false;
    this._restoreInert();

    this.dispatchEvent(new CustomEvent('bl-dialog-hide', { composed: true, bubbles: true }));
  }

  private _applyInert(): void {
    this._inertElements = [];
    const siblings = document.body.children;
    for (const el of siblings) {
      if (el === this || el.contains(this)) continue;
      if (el instanceof HTMLElement) {
        this._inertElements.push({ el, prev: el.getAttribute('inert') });
        el.setAttribute('inert', '');
      }
    }
  }

  private _restoreInert(): void {
    for (const { el, prev } of this._inertElements) {
      if (prev === null) {
        (el as HTMLElement).removeAttribute('inert');
      } else {
        (el as HTMLElement).setAttribute('inert', prev);
      }
    }
    this._inertElements = [];
  }

  protected override render() {
    if (!this._visible) return nothing;

    return html`
      <div class="backdrop" @click=${this._handleOverlayClick}></div>
      <div
        class="dialog"
        part="dialog"
        role="dialog"
        aria-modal="true"
        aria-label=${this.label || nothing}
      >
        <div class="dialog-header" part="header">
          <slot name="header"></slot>
          ${!this.preventClose
            ? html`
                <button
                  class="close-button"
                  part="close-button"
                  aria-label="Close dialog"
                  @click=${this._handleCloseClick}
                >
                  <svg
                    width="16"
                    height="16"
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
              `
            : nothing}
        </div>
        <div class="dialog-body" part="body">
          <slot></slot>
        </div>
        <div class="dialog-footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-dialog': BlDialog;
  }
}
