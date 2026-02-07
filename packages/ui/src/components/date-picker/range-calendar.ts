import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { rangeCalendarStyles } from './date-picker.styles.js';
import { CalendarController } from '../../controllers/calendar.js';
import type { DateRange } from './calendar.js';

/**
 * Dual-month side-by-side calendar for date range selection.
 * Uses two CalendarController instances for linked left/right month panels.
 *
 * @element bl-range-calendar
 * @fires bl-date-range-change - Emitted when a complete range is selected.
 */
@customElement('bl-range-calendar')
export class BlRangeCalendar extends LitElement {
  static override styles = [tokens, rangeCalendarStyles];

  /** Left panel calendar controller. */
  private _leftCal = new CalendarController(this);
  /** Right panel calendar controller. */
  private _rightCal = new CalendarController(this);

  /** Current selected range value with start and end ISO date strings. */
  @property({ type: Object })
  value: DateRange = { start: '', end: '' };

  /** Minimum selectable date (ISO YYYY-MM-DD). */
  @property()
  min = '';

  /** Maximum selectable date (ISO YYYY-MM-DD). */
  @property()
  max = '';

  /** Locale for month/day names. */
  @property()
  locale = '';

  /** The first-clicked anchor date during range selection. */
  @state()
  private _rangeAnchor = '';

  /** The currently hovered date for preview highlighting. */
  @state()
  private _hoverDate = '';

  /** Internally tracked range start during selection. */
  @state()
  private _rangeStart = '';

  /** Internally tracked range end during selection. */
  @state()
  private _rangeEnd = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'grid');
    this.setAttribute('aria-label', 'Date range calendar');
    this.addEventListener('keydown', this._handleKeyDown);

    // Initialize right panel to next month
    const now = new Date();
    this._rightCal.setMonth(now.getFullYear(), now.getMonth() + 1);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('min')) {
      this._leftCal.setMin(this.min);
      this._rightCal.setMin(this.min);
    }
    if (changed.has('max')) {
      this._leftCal.setMax(this.max);
      this._rightCal.setMax(this.max);
    }
    if (changed.has('value')) {
      this._rangeStart = this.value.start;
      this._rangeEnd = this.value.end;
      if (this.value.start) {
        this._leftCal.goToDate(this.value.start);
        // Set right panel to the month after left
        const d = new Date(
          this._leftCal.year,
          this._leftCal.month + 1,
          1,
        );
        this._rightCal.setMonth(d.getFullYear(), d.getMonth());
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'PageUp') {
      e.preventDefault();
      this._prevMonth();
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      this._nextMonth();
    }
  };

  /** Navigate both panels backward by one month. */
  private _prevMonth(): void {
    this._leftCal.prevMonth();
    this._rightCal.setMonth(this._leftCal.year, this._leftCal.month + 1);
  }

  /** Navigate both panels forward by one month. */
  private _nextMonth(): void {
    this._leftCal.nextMonth();
    this._rightCal.setMonth(this._leftCal.year, this._leftCal.month + 1);
  }

  private _handleDateClick(date: string, disabled: boolean): void {
    if (disabled) return;

    if (!this._rangeAnchor) {
      // First click: set anchor
      this._rangeAnchor = date;
      this._rangeStart = date;
      this._rangeEnd = '';
      this._hoverDate = '';
    } else {
      // Second click: complete the range
      let start = this._rangeAnchor;
      let end = date;
      if (start > end) {
        [start, end] = [end, start];
      }
      this._rangeStart = start;
      this._rangeEnd = end;
      this._rangeAnchor = '';
      this._hoverDate = '';

      this.value = { start, end };
      this.dispatchEvent(
        new CustomEvent('bl-date-range-change', {
          detail: { start, end },
          composed: true,
          bubbles: true,
        }),
      );
    }
  }

  private _handleCellHover(date: string): void {
    if (this._rangeAnchor) {
      this._hoverDate = date;
    }
  }

  /** Set a range programmatically (used by presets). */
  setRange(start: string, end: string): void {
    this._rangeStart = start;
    this._rangeEnd = end;
    this._rangeAnchor = '';
    this._hoverDate = '';
    this.value = { start, end };
    if (start) {
      this._leftCal.goToDate(start);
      this._rightCal.setMonth(this._leftCal.year, this._leftCal.month + 1);
    }
    this.requestUpdate();
  }

  private _isInRange(date: string): boolean {
    if (this._rangeStart && this._rangeEnd) {
      return date > this._rangeStart && date < this._rangeEnd;
    }
    return false;
  }

  private _isInPreview(date: string): boolean {
    if (!this._rangeAnchor || !this._hoverDate) return false;
    const start = this._rangeAnchor < this._hoverDate ? this._rangeAnchor : this._hoverDate;
    const end = this._rangeAnchor < this._hoverDate ? this._hoverDate : this._rangeAnchor;
    return date > start && date < end;
  }

  private _isPreviewStart(date: string): boolean {
    if (!this._rangeAnchor || !this._hoverDate) return false;
    const start = this._rangeAnchor < this._hoverDate ? this._rangeAnchor : this._hoverDate;
    return date === start;
  }

  private _isPreviewEnd(date: string): boolean {
    if (!this._rangeAnchor || !this._hoverDate) return false;
    const end = this._rangeAnchor < this._hoverDate ? this._hoverDate : this._rangeAnchor;
    return date === end;
  }

  private _renderMonthPanel(
    cal: CalendarController,
    showPrev: boolean,
    showNext: boolean,
  ) {
    const grid = cal.getDays();
    const weekdays = cal.weekdays;

    return html`
      <div class="month-panel">
        <div class="month-header">
          ${showPrev
            ? html`
                <button
                  class="nav-btn"
                  aria-label="Previous month"
                  @click=${() => this._prevMonth()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              `
            : html`<div class="nav-spacer"></div>`}
          <span class="month-year">${cal.monthName} ${cal.year}</span>
          ${showNext
            ? html`
                <button
                  class="nav-btn"
                  aria-label="Next month"
                  @click=${() => this._nextMonth()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              `
            : html`<div class="nav-spacer"></div>`}
        </div>

        <div class="weekdays" role="row">
          ${weekdays.map((d) => html`<span class="weekday" role="columnheader">${d}</span>`)}
        </div>

        <div class="days">
          ${grid.map((week) =>
            week.map(
              (day) => html`
                <bl-calendar-cell
                  .date=${day.date}
                  .day=${day.day}
                  ?outside-month=${!day.currentMonth}
                  ?today=${day.today}
                  ?disabled=${day.disabled}
                  ?in-range=${this._isInRange(day.date)}
                  ?range-start=${this._rangeStart === day.date}
                  ?range-end=${this._rangeEnd === day.date}
                  ?range-preview=${this._isInPreview(day.date)}
                  ?range-preview-start=${this._isPreviewStart(day.date)}
                  ?range-preview-end=${this._isPreviewEnd(day.date)}
                  @bl-cell-click=${() => this._handleDateClick(day.date, day.disabled)}
                  @bl-cell-hover=${() => this._handleCellHover(day.date)}
                ></bl-calendar-cell>
              `,
            ),
          )}
        </div>
      </div>
    `;
  }

  protected override render() {
    return html`
      <div class="range-calendar" part="range-calendar">
        ${this._renderMonthPanel(this._leftCal, true, false)}
        <div class="divider"></div>
        ${this._renderMonthPanel(this._rightCal, false, true)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-range-calendar': BlRangeCalendar;
  }
}
