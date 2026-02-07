import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tooltipStyles } from './tooltip.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import type { Placement } from '@floating-ui/dom';

// Global singleton: only one tooltip at a time, with warmup/cooldown
let activeTooltip: BlTooltip | null = null;
let warmupTimer: ReturnType<typeof setTimeout> | null = null;
let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
let isWarmedUp = false;

const COOLDOWN_MS = 400;

/**
 * A tooltip that displays on hover/focus of its slotted trigger.
 *
 * @element bl-tooltip
 * @slot - The trigger element.
 * @fires bl-tooltip-show - Emitted when tooltip becomes visible.
 * @fires bl-tooltip-hide - Emitted when tooltip is hidden.
 */
@customElement('bl-tooltip')
export class BlTooltip extends LitElement {
  static override styles = [tokens, tooltipStyles];

  private _overlay = new OverlayController(this, { arrowSelector: '.tooltip-arrow' });
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });

  /** The tooltip text content. */
  @property()
  content = '';

  /** Preferred placement. */
  @property()
  placement: Placement = 'top';

  /** Delay in ms before showing. */
  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 700;

  /** Delay in ms before hiding. */
  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 300;

  /** Disable the tooltip. */
  @property({ type: Boolean })
  disabled = false;

  /** Open state. */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  private _visible = false;

  private _showTimer: ReturnType<typeof setTimeout> | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;
  private _tooltipId = `bl-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
    this.addEventListener('focusin', this._handleFocusIn);
    this.addEventListener('focusout', this._handleFocusOut);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimers();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this.removeEventListener('focusin', this._handleFocusIn);
    this.removeEventListener('focusout', this._handleFocusOut);
    this.removeEventListener('keydown', this._handleKeyDown);
    if (activeTooltip === this) activeTooltip = null;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._show();
      } else if (this._visible) {
        this._hide();
      }
    }
    if (changed.has('placement')) {
      this._overlay.setPlacement(this.placement);
    }
  }

  private _clearTimers(): void {
    if (this._showTimer) { clearTimeout(this._showTimer); this._showTimer = null; }
    if (this._hideTimer) { clearTimeout(this._hideTimer); this._hideTimer = null; }
  }

  private _handleMouseEnter = (): void => {
    if (this.disabled) return;
    this._clearTimers();

    // If warmup is active (recently closed another tooltip), show immediately
    const delay = isWarmedUp ? 0 : this.showDelay;
    this._showTimer = setTimeout(() => this._show(), delay);
  };

  private _handleMouseLeave = (): void => {
    this._clearTimers();
    this._hideTimer = setTimeout(() => this._hide(), this.hideDelay);
  };

  private _handleFocusIn = (): void => {
    if (this.disabled) return;
    this._clearTimers();
    this._show();
  };

  private _handleFocusOut = (): void => {
    this._clearTimers();
    this._hide();
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._visible) {
      e.preventDefault();
      this._hide();
    }
  };

  private async _show(): Promise<void> {
    if (this._visible || this.disabled || !this.content) return;

    // Close any other active tooltip
    if (activeTooltip && activeTooltip !== this) {
      activeTooltip._hide();
    }
    activeTooltip = this;

    // Clear cooldown since we're showing a new tooltip
    if (cooldownTimer) { clearTimeout(cooldownTimer); cooldownTimer = null; }
    isWarmedUp = true;

    this._visible = true;
    await this.updateComplete;

    const trigger = this.querySelector<HTMLElement>(':first-child') ?? this;
    const surface = this.shadowRoot!.querySelector<HTMLElement>('.tooltip-surface');
    if (!surface) return;

    trigger.setAttribute('aria-describedby', this._tooltipId);
    this._overlay.setPlacement(this.placement);
    this._overlay.show(trigger, surface);
    this._animation.enter(surface);

    this.dispatchEvent(new CustomEvent('bl-tooltip-show', { composed: true, bubbles: true }));
  }

  private async _hide(): Promise<void> {
    if (!this._visible) return;

    const surface = this.shadowRoot!.querySelector<HTMLElement>('.tooltip-surface');
    if (surface) {
      await this._animation.exit(surface);
    }

    this._overlay.hide();
    this._visible = false;

    const trigger = this.querySelector<HTMLElement>(':first-child');
    trigger?.removeAttribute('aria-describedby');

    if (activeTooltip === this) {
      activeTooltip = null;
      // Start cooldown for warmup
      cooldownTimer = setTimeout(() => { isWarmedUp = false; }, COOLDOWN_MS);
    }

    this.dispatchEvent(new CustomEvent('bl-tooltip-hide', { composed: true, bubbles: true }));
  }

  protected override render() {
    return html`
      <slot></slot>
      ${this._visible
        ? html`
            <div
              class="tooltip-surface"
              id=${this._tooltipId}
              role="tooltip"
            >
              ${this.content}
              <div class="tooltip-arrow"></div>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
