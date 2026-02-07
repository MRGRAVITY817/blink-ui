import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { datePickerStyles } from './date-picker.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';

/**
 * Date picker with segmented input + calendar popup.
 * Internal representation is ISO `YYYY-MM-DD` strings.
 *
 * @element bl-date-picker
 * @fires bl-date-change - Emitted when the final date value is set.
 * @fires bl-date-input - Emitted during segment editing.
 */
@customElement('bl-date-picker')
export class BlDatePicker extends LitElement {
  static override styles = [tokens, datePickerStyles];

  private _overlay = new OverlayController(this, { offset: 4 });
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { if (this._popupVisible) this._closePopup(); },
    active: false,
  });

  /** Current date value (ISO YYYY-MM-DD). */
  @property()
  value = '';

  /** Locale for display format. */
  @property()
  locale = '';

  /** Minimum selectable date (ISO). */
  @property()
  min = '';

  /** Maximum selectable date (ISO). */
  @property()
  max = '';

  /** Whether the picker is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the calendar popup is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  private _popupVisible = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('bl-date-field-trigger', this._handleTrigger as EventListener);
    this.addEventListener('bl-date-input', this._handleDateInput as EventListener);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-date-field-trigger', this._handleTrigger as EventListener);
    this.removeEventListener('bl-date-input', this._handleDateInput as EventListener);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._openPopup();
      else if (this._popupVisible) this._closePopup();
    }
  }

  private _handleTrigger = (): void => {
    if (this.disabled) return;
    this.open = !this.open;
  };

  private _handleDateInput = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this.value = e.detail.value;
    this.dispatchEvent(
      new CustomEvent('bl-date-input', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleCalendarChange = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this.value = e.detail.value;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('bl-date-change', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.open = false;
    }
  };

  private async _openPopup(): Promise<void> {
    if (this._popupVisible) return;
    this._popupVisible = true;
    await this.updateComplete;

    const field = this.shadowRoot!.querySelector<HTMLElement>('bl-date-field');
    const popup = this.shadowRoot!.querySelector<HTMLElement>('.popup');
    if (!field || !popup) return;

    this._overlay.show(field, popup);
    this._animation.enter(popup);
    this._clickOutside.active = true;
  }

  private async _closePopup(): Promise<void> {
    if (!this._popupVisible) return;

    const popup = this.shadowRoot!.querySelector<HTMLElement>('.popup');
    if (popup) await this._animation.exit(popup);

    this._overlay.hide();
    this._clickOutside.active = false;
    this._popupVisible = false;
  }

  protected override render() {
    return html`
      <bl-date-field
        .value=${this.value}
        .locale=${this.locale}
        show-trigger
      ></bl-date-field>

      ${this._popupVisible
        ? html`
            <div class="popup" part="popup">
              <bl-calendar
                .value=${this.value}
                .min=${this.min}
                .max=${this.max}
                .locale=${this.locale}
                @bl-date-change=${this._handleCalendarChange}
              ></bl-calendar>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-date-picker': BlDatePicker;
  }
}
