import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { calendarCardStyles } from './date-picker.styles.js';
import type { PresetKey } from './calendar-presets.js';

/**
 * Wraps a calendar (single or range) with an optional presets sidebar
 * and Cancel/Apply footer. Designed to be placed inside a popup or inline.
 *
 * @element bl-calendar-card
 * @fires bl-calendar-apply - Emitted when Apply is clicked. Detail: { start, end }.
 * @fires bl-calendar-cancel - Emitted when Cancel is clicked.
 * @slot - Default slot for the calendar content (bl-calendar or bl-range-calendar).
 */
@customElement('bl-calendar-card')
export class BlCalendarCard extends LitElement {
  static override styles = [tokens, calendarCardStyles];

  /** Whether to show the presets sidebar. */
  @property({ type: Boolean, attribute: 'show-presets' })
  showPresets = false;

  /** Whether to show the Cancel/Apply footer. */
  @property({ type: Boolean, attribute: 'show-footer' })
  showFooter = false;

  /** Range start date (ISO), tracked for Apply button. */
  @property({ attribute: 'range-start' })
  rangeStart = '';

  /** Range end date (ISO), tracked for Apply button. */
  @property({ attribute: 'range-end' })
  rangeEnd = '';

  /** The currently active preset key. */
  @state()
  private _activePreset: PresetKey | '' = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('bl-date-range-change', this._handleRangeChange as EventListener);
    this.addEventListener('bl-preset-select', this._handlePresetSelect as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-date-range-change', this._handleRangeChange as EventListener);
    this.removeEventListener('bl-preset-select', this._handlePresetSelect as EventListener);
  }

  private _handleRangeChange = (e: CustomEvent<{ start: string; end: string }>): void => {
    e.stopPropagation();
    this.rangeStart = e.detail.start;
    this.rangeEnd = e.detail.end;
    this._activePreset = 'custom';
  };

  private _handlePresetSelect = (e: CustomEvent<{ key: PresetKey; start: string; end: string }>): void => {
    e.stopPropagation();
    this._activePreset = e.detail.key;

    if (e.detail.key !== 'custom' && e.detail.start && e.detail.end) {
      this.rangeStart = e.detail.start;
      this.rangeEnd = e.detail.end;

      // Push the preset range to the range-calendar child if present
      const rangeCal = this.querySelector('bl-range-calendar') as any;
      if (rangeCal?.setRange) {
        rangeCal.setRange(e.detail.start, e.detail.end);
      }
    }
  };

  private _handleApply = (): void => {
    this.dispatchEvent(
      new CustomEvent('bl-calendar-apply', {
        detail: {
          start: this.rangeStart,
          end: this.rangeEnd,
        },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleCancel = (): void => {
    this.dispatchEvent(
      new CustomEvent('bl-calendar-cancel', {
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    const hasRange = Boolean(this.rangeStart && this.rangeEnd);

    return html`
      <div class="calendar-card" part="card">
        <div class="card-body">
          ${this.showPresets
            ? html`
                <div class="presets-sidebar" part="presets-sidebar">
                  <bl-calendar-presets
                    .activePreset=${this._activePreset}
                    @bl-preset-select=${this._handlePresetSelect}
                  ></bl-calendar-presets>
                </div>
              `
            : nothing}
          <div class="calendar-content" part="calendar-content">
            <slot></slot>
          </div>
        </div>

        ${this.showFooter
          ? html`
              <div class="card-footer" part="footer">
                <button
                  class="footer-btn footer-btn--cancel"
                  @click=${this._handleCancel}
                >
                  Cancel
                </button>
                <button
                  class="footer-btn footer-btn--apply"
                  ?disabled=${!hasRange}
                  @click=${this._handleApply}
                >
                  Apply
                </button>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-calendar-card': BlCalendarCard;
  }
}
