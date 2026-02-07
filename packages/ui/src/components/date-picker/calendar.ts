import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { calendarStyles } from './date-picker.styles.js';
import { CalendarController } from '../../controllers/calendar.js';

/**
 * Standalone month calendar with `role="grid"`.
 * Works as inline calendar or inside bl-date-picker.
 *
 * @element bl-calendar
 * @fires bl-date-change - Emitted when a date is selected.
 */
@customElement('bl-calendar')
export class BlCalendar extends LitElement {
  static override styles = [tokens, calendarStyles];

  private _cal = new CalendarController(this);

  /** Currently selected date (ISO YYYY-MM-DD). */
  @property()
  value = '';

  /** Minimum selectable date (ISO YYYY-MM-DD). */
  @property()
  min = '';

  /** Maximum selectable date (ISO YYYY-MM-DD). */
  @property()
  max = '';

  /** Locale for month/day names. */
  @property()
  locale = '';

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
    this.value = date;
    this.dispatchEvent(
      new CustomEvent('bl-date-change', {
        detail: { value: date },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    const grid = this._cal.getDays();
    const weekdays = this._cal.weekdays;

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
                  ?selected=${this.value === day.date}
                  ?disabled=${day.disabled}
                  @bl-cell-click=${() => this._handleDateClick(day.date, day.disabled)}
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
