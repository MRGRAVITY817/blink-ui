import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { popoverStyles } from './popover.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { FocusTrapController } from '../../controllers/focus-trap.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import type { Placement } from '@floating-ui/dom';

/**
 * A popover that anchors to a trigger element.
 *
 * @element bl-popover
 * @slot trigger - The element that opens the popover.
 * @slot - Default slot for popover content.
 * @fires bl-popover-show - Emitted when popover opens.
 * @fires bl-popover-hide - Emitted when popover closes.
 */
@customElement('bl-popover')
export class BlPopover extends LitElement {
  static override styles = [tokens, popoverStyles];

  private _overlay = new OverlayController(this, { arrowSelector: '.popover-arrow' });
  private _animation = new AnimationController(this);
  private _focusTrap = new FocusTrapController(this, { active: false });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => {
      if (this.open && this.closeOnClickOutside) this._close();
    },
    active: false,
  });

  private _popoverId = `bl-popover-${Math.random().toString(36).slice(2, 9)}`;

  /** Whether the popover is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Preferred placement. */
  @property()
  placement: Placement = 'bottom';

  /** Whether clicking outside closes the popover. Default: true */
  @property({ type: Boolean, attribute: 'close-on-click-outside' })
  closeOnClickOutside = true;

  /** Whether pressing Escape closes the popover. Default: true */
  @property({ type: Boolean, attribute: 'close-on-escape' })
  closeOnEscape = true;

  /** Whether focus is trapped (modal behavior). Default: false */
  @property({ type: Boolean })
  modal = false;

  /** Offset in pixels from the trigger. Default: 8 */
  @property({ type: Number })
  offset = 8;

  @state()
  private _visible = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._openPopover();
      } else if (this._visible) {
        this._closePopover();
      }
    }
    if (changed.has('placement')) {
      this._overlay.setPlacement(this.placement);
    }
    if (changed.has('offset')) {
      this._overlay.setOffset(this.offset);
    }
  }

  private _getTrigger(): HTMLElement | null {
    const slot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    return slot?.assignedElements()[0] as HTMLElement | null;
  }

  private _handleTriggerClick = (): void => {
    if (this.open) {
      this._close();
    } else {
      this.open = true;
    }
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open && this.closeOnEscape) {
      e.preventDefault();
      e.stopPropagation();
      this._close();
    }
  };

  private async _openPopover(): Promise<void> {
    if (this._visible) return;
    this._visible = true;
    await this.updateComplete;

    const trigger = this._getTrigger();
    const surface = this.shadowRoot!.querySelector<HTMLElement>('.popover-surface');
    if (!trigger || !surface) return;

    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-controls', this._popoverId);
    trigger.setAttribute('aria-haspopup', 'dialog');

    this._overlay.setPlacement(this.placement);
    this._overlay.setOffset(this.offset);
    this._overlay.show(trigger, surface);
    this._animation.enter(surface);

    this._clickOutside.active = this.closeOnClickOutside;
    if (this.modal) {
      this._focusTrap.active = true;
    }

    this.dispatchEvent(new CustomEvent('bl-popover-show', { composed: true, bubbles: true }));
  }

  private async _closePopover(): Promise<void> {
    if (!this._visible) return;

    const surface = this.shadowRoot!.querySelector<HTMLElement>('.popover-surface');
    if (surface) {
      await this._animation.exit(surface);
    }

    this._overlay.hide();
    this._clickOutside.active = false;
    this._focusTrap.active = false;
    this._visible = false;

    const trigger = this._getTrigger();
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.removeAttribute('aria-controls');
    trigger?.focus();

    this.dispatchEvent(new CustomEvent('bl-popover-hide', { composed: true, bubbles: true }));
  }

  private _close(): void {
    this.open = false;
  }

  private _handleSlotChange(): void {
    const trigger = this._getTrigger();
    if (!trigger) return;
    trigger.removeEventListener('click', this._handleTriggerClick);
    trigger.addEventListener('click', this._handleTriggerClick);
    trigger.setAttribute('aria-expanded', String(this.open));
  }

  protected override render() {
    return html`
      <slot name="trigger" @slotchange=${this._handleSlotChange}></slot>
      ${this._visible
        ? html`
            <div
              class="popover-surface"
              id=${this._popoverId}
              role="dialog"
            >
              <div class="popover-content">
                <slot></slot>
              </div>
              <div class="popover-arrow"></div>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-popover': BlPopover;
  }
}
