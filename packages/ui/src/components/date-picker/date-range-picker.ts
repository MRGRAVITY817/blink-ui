import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { dateRangePickerStyles } from './date-picker.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import type { DateRange } from './calendar.js';

/**
 * Date range picker with an input showing "mm/dd/yyyy - mm/dd/yyyy"
 * and a popup containing a dual-month range calendar.
 *
 * @element bl-date-range-picker
 * @fires bl-date-range-change - Emitted when a complete date range is selected.
 */
@customElement('bl-date-range-picker')
export class BlDateRangePicker extends LitElement {
  static override styles = [tokens, dateRangePickerStyles];

  private _overlay = new OverlayController(this, { offset: 4 });
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { if (this._popupVisible) this._closePopup(); },
    active: false,
  });

  /** Current date range value with start/end ISO date strings. */
  @property({ type: Object })
  value: DateRange = { start: '', end: '' };

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

  /** Whether to show preset buttons in the popup. */
  @property({ type: Boolean, attribute: 'show-presets' })
  showPresets = false;

  /** Whether to show Cancel/Apply footer. */
  @property({ type: Boolean, attribute: 'show-footer' })
  showFooter = false;

  /** Placeholder text for the start date. */
  @property({ attribute: 'start-placeholder' })
  startPlaceholder = 'mm/dd/yyyy';

  /** Placeholder text for the end date. */
  @property({ attribute: 'end-placeholder' })
  endPlaceholder = 'mm/dd/yyyy';

  @state()
  private _popupVisible = false;

  /** Pending range while user is picking (before Apply when showFooter is true). */
  @state()
  private _pendingRange: DateRange = { start: '', end: '' };

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
      if (this.open) this._openPopup();
      else if (this._popupVisible) this._closePopup();
    }
    if (changed.has('value')) {
      this._pendingRange = { ...this.value };
    }
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.open = false;
    }
  };

  private _handleInputClick = (): void => {
    if (this.disabled) return;
    this.open = !this.open;
  };

  private _handleRangeChange = (e: CustomEvent<{ start: string; end: string }>): void => {
    e.stopPropagation();
    this._pendingRange = { start: e.detail.start, end: e.detail.end };

    if (!this.showFooter) {
      // Immediately commit
      this.value = { ...this._pendingRange };
      this.open = false;
      this._fireRangeChange();
    }
  };

  private _handleApply = (e: CustomEvent<{ start: string; end: string }>): void => {
    e.stopPropagation();
    this.value = { start: e.detail.start, end: e.detail.end };
    this.open = false;
    this._fireRangeChange();
  };

  private _handleCancel = (e: CustomEvent): void => {
    e.stopPropagation();
    this._pendingRange = { ...this.value };
    this.open = false;
  };

  private _fireRangeChange(): void {
    this.dispatchEvent(
      new CustomEvent('bl-date-range-change', {
        detail: { start: this.value.start, end: this.value.end },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private async _openPopup(): Promise<void> {
    if (this._popupVisible) return;
    this._popupVisible = true;
    this._pendingRange = { ...this.value };
    await this.updateComplete;

    const input = this.shadowRoot!.querySelector<HTMLElement>('.range-input');
    const popup = this.shadowRoot!.querySelector<HTMLElement>('.popup');
    if (!input || !popup) return;

    this._overlay.show(input, popup);
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

  /** Format an ISO date for display. */
  private _formatDate(iso: string): string {
    if (!iso) return '';
    try {
      const [y, m, d] = iso.split('-');
      return `${m}/${d}/${y}`;
    } catch {
      return iso;
    }
  }

  protected override render() {
    const startDisplay = this._formatDate(this.value.start);
    const endDisplay = this._formatDate(this.value.end);
    const hasValue = Boolean(this.value.start || this.value.end);

    return html`
      <div
        class="range-input"
        part="input"
        tabindex="0"
        role="button"
        aria-haspopup="dialog"
        aria-expanded=${this.open ? 'true' : 'false'}
        @click=${this._handleInputClick}
      >
        <span class="range-text ${!hasValue ? 'placeholder' : ''}">
          ${startDisplay || this.startPlaceholder}
        </span>
        <span class="range-separator" aria-hidden="true">&ndash;</span>
        <span class="range-text ${!hasValue ? 'placeholder' : ''}">
          ${endDisplay || this.endPlaceholder}
        </span>
        <span class="calendar-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
      </div>

      ${this._popupVisible
        ? html`
            <div class="popup" part="popup">
              ${this.showPresets || this.showFooter
                ? html`
                    <bl-calendar-card
                      ?show-presets=${this.showPresets}
                      ?show-footer=${this.showFooter}
                      .rangeStart=${this._pendingRange.start}
                      .rangeEnd=${this._pendingRange.end}
                      @bl-calendar-apply=${this._handleApply}
                      @bl-calendar-cancel=${this._handleCancel}
                    >
                      <bl-range-calendar
                        .value=${{ start: this._pendingRange.start, end: this._pendingRange.end }}
                        .min=${this.min}
                        .max=${this.max}
                        .locale=${this.locale}
                        @bl-date-range-change=${this._handleRangeChange}
                      ></bl-range-calendar>
                    </bl-calendar-card>
                  `
                : html`
                    <bl-range-calendar
                      .value=${{ start: this._pendingRange.start, end: this._pendingRange.end }}
                      .min=${this.min}
                      .max=${this.max}
                      .locale=${this.locale}
                      @bl-date-range-change=${this._handleRangeChange}
                    ></bl-range-calendar>
                  `}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-date-range-picker': BlDateRangePicker;
  }
}
