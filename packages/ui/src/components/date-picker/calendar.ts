import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { calendarStyles } from './date-picker.styles.js';
import { CalendarController } from '../../controllers/calendar.js';

export type CalendarMode = 'single' | 'range';

export interface DateRange {
  start: string;
  end: string;
}

/**
 * Standalone month calendar with `role="grid"`.
 * Works as inline calendar or inside bl-date-picker.
 * Supports single date selection and range selection modes.
 *
 * @element bl-calendar
 * @fires bl-date-change - Emitted when a date is selected (single mode).
 * @fires bl-date-range-change - Emitted when a range is selected (range mode).
 */
@customElement('bl-calendar')
export class BlCalendar extends LitElement {
  static override styles = [tokens, calendarStyles];

  private _cal = new CalendarController(this);

  /** Selection mode: 'single' for one date, 'range' for start/end. */
  @property()
  mode: CalendarMode = 'single';

  /** Currently selected date (ISO YYYY-MM-DD). Used in single mode. */
  @property()
  value = '';

  /** Start date of range selection (ISO YYYY-MM-DD). Used in range mode. */
  @property({ attribute: 'range-start' })
  rangeStart = '';

  /** End date of range selection (ISO YYYY-MM-DD). Used in range mode. */
  @property({ attribute: 'range-end' })
  rangeEnd = '';

  /** Minimum selectable date (ISO YYYY-MM-DD). */
  @property()
  min = '';

  /** Maximum selectable date (ISO YYYY-MM-DD). */
  @property()
  max = '';

  /** Locale for month/day names. */
  @property()
  locale = '';

  /** The date currently being hovered (for range preview). */
  @state()
  private _hoverDate = '';

  /** During range selection, the first click anchor date. */
  @state()
  private _rangeAnchor = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'grid');
    this.setAttribute('aria-label', 'Calendar');
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('min')) this._cal.setMin(this.min);
    if (changed.has('max')) this._cal.setMax(this.max);
    if (changed.has('value') && this.value) this._cal.goToDate(this.value);
    if (changed.has('rangeStart') && this.rangeStart) this._cal.goToDate(this.rangeStart);
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    // PageUp/PageDown for month navigation
    if (e.key === 'PageUp') {
      e.preventDefault();
      if (e.shiftKey) this._cal.prevYear();
      else this._cal.prevMonth();
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      if (e.shiftKey) this._cal.nextYear();
      else this._cal.nextMonth();
    }
  };

  private _handleDateClick(date: string, disabled: boolean): void {
    if (disabled) return;

    if (this.mode === 'range') {
      this._handleRangeClick(date);
    } else {
      this.value = date;
      this.dispatchEvent(
        new CustomEvent('bl-date-change', {
          detail: { value: date },
          composed: true,
          bubbles: true,
        }),
      );
    }
  }

  private _handleRangeClick(date: string): void {
    if (!this._rangeAnchor) {
      // First click: set anchor (range start)
      this._rangeAnchor = date;
      this.rangeStart = date;
      this.rangeEnd = '';
      this._hoverDate = '';
    } else {
      // Second click: complete the range
      let start = this._rangeAnchor;
      let end = date;
      if (start > end) {
        [start, end] = [end, start];
      }
      this.rangeStart = start;
      this.rangeEnd = end;
      this._rangeAnchor = '';
      this._hoverDate = '';

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
    if (this.mode === 'range' && this._rangeAnchor) {
      this._hoverDate = date;
    }
  }

  private _isInRange(date: string): boolean {
    if (this.rangeStart && this.rangeEnd) {
      return date > this.rangeStart && date < this.rangeEnd;
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

  protected override render() {
    const grid = this._cal.getDays();
    const weekdays = this._cal.weekdays;
    const isRange = this.mode === 'range';

    return html`
      <div class="calendar" part="calendar">
        <div class="header" part="header">
          <span class="month-year">${this._cal.monthName} ${this._cal.year}</span>
          <div class="nav-buttons">
            <button
              class="nav-btn"
              aria-label="Previous month"
              @click=${() => this._cal.prevMonth()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              class="nav-btn"
              aria-label="Next month"
              @click=${() => this._cal.nextMonth()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
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
                  ?selected=${!isRange && this.value === day.date}
                  ?disabled=${day.disabled}
                  ?in-range=${isRange && this._isInRange(day.date)}
                  ?range-start=${isRange && this.rangeStart === day.date}
                  ?range-end=${isRange && this.rangeEnd === day.date}
                  ?range-preview=${isRange && this._isInPreview(day.date)}
                  ?range-preview-start=${isRange && this._isPreviewStart(day.date)}
                  ?range-preview-end=${isRange && this._isPreviewEnd(day.date)}
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
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-calendar': BlCalendar;
  }
}
