import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface CalendarOptions {
  /** Locale for Intl.DateTimeFormat. Default: undefined (browser default) */
  locale?: string;
  /** Minimum selectable date (ISO string YYYY-MM-DD). */
  min?: string;
  /** Maximum selectable date (ISO string YYYY-MM-DD). */
  max?: string;
}

export interface CalendarDay {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** Day of month (1-31) */
  day: number;
  /** Whether this day belongs to the currently displayed month */
  currentMonth: boolean;
  /** Whether this day is today */
  today: boolean;
  /** Whether this day is outside the min/max range */
  disabled: boolean;
}

/**
 * Pure logic for calendar math — no DOM.
 * Generates a 6×7 day grid for any month, handles month/year navigation,
 * date comparison, and min/max constraints.
 * Uses native Intl.DateTimeFormat for locale-aware names.
 */
export class CalendarController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _locale: string | undefined;
  private _min: string;
  private _max: string;
  private _year: number;
  private _month: number; // 0-indexed

  constructor(host: ReactiveControllerHost, options?: CalendarOptions) {
    this._host = host;
    this._locale = options?.locale;
    this._min = options?.min ?? '';
    this._max = options?.max ?? '';
    const now = new Date();
    this._year = now.getFullYear();
    this._month = now.getMonth();
    host.addController(this);
  }

  hostConnected(): void {}
  hostDisconnected(): void {}

  /** Current displayed year. */
  get year(): number {
    return this._year;
  }

  /** Current displayed month (0-indexed). */
  get month(): number {
    return this._month;
  }

  /** Formatted month name (e.g. "January"). */
  get monthName(): string {
    const fmt = new Intl.DateTimeFormat(this._locale, { month: 'long' });
    return fmt.format(new Date(this._year, this._month, 1));
  }

  /** Locale-aware weekday short names starting from locale's first day of week. */
  get weekdays(): string[] {
    const fmt = new Intl.DateTimeFormat(this._locale, { weekday: 'short' });
    // Generate weekday names starting from Sunday (0)
    return Array.from({ length: 7 }, (_, i) => {
      // Jan 4, 2024 is a Thursday; use a known Sunday: Jan 7, 2024
      const d = new Date(2024, 0, 7 + i); // 7 = Sunday
      return fmt.format(d);
    });
  }

  /** Navigate to a specific month/year. */
  setMonth(year: number, month: number): void {
    // Normalize month overflow
    const d = new Date(year, month, 1);
    this._year = d.getFullYear();
    this._month = d.getMonth();
    this._host.requestUpdate();
  }

  /** Go to next month. */
  nextMonth(): void {
    this.setMonth(this._year, this._month + 1);
  }

  /** Go to previous month. */
  prevMonth(): void {
    this.setMonth(this._year, this._month - 1);
  }

  /** Go to next year. */
  nextYear(): void {
    this.setMonth(this._year + 1, this._month);
  }

  /** Go to previous year. */
  prevYear(): void {
    this.setMonth(this._year - 1, this._month);
  }

  /** Navigate to the month containing the given ISO date. */
  goToDate(isoDate: string): void {
    const d = parseISO(isoDate);
    if (d) this.setMonth(d.getFullYear(), d.getMonth());
  }

  /** Update min constraint. */
  setMin(min: string): void {
    this._min = min;
  }

  /** Update max constraint. */
  setMax(max: string): void {
    this._max = max;
  }

  /** Generate the 6×7 grid of CalendarDay objects for the current month. */
  getDays(): CalendarDay[][] {
    const firstOfMonth = new Date(this._year, this._month, 1);
    const startDay = firstOfMonth.getDay(); // 0=Sunday
    const daysInMonth = new Date(this._year, this._month + 1, 0).getDate();

    // Start grid from the Sunday before (or on) the 1st
    const gridStart = new Date(this._year, this._month, 1 - startDay);

    const today = toISO(new Date());
    const grid: CalendarDay[][] = [];

    for (let week = 0; week < 6; week++) {
      const row: CalendarDay[] = [];
      for (let dow = 0; dow < 7; dow++) {
        const d = new Date(gridStart);
        d.setDate(gridStart.getDate() + week * 7 + dow);
        const iso = toISO(d);
        const dayOfMonth = d.getDate();
        const isCurrentMonth = d.getMonth() === this._month && d.getFullYear() === this._year;

        row.push({
          date: iso,
          day: dayOfMonth,
          currentMonth: isCurrentMonth,
          today: iso === today,
          disabled: this._isDisabled(iso),
        });
      }
      grid.push(row);
    }

    return grid;
  }

  /** Check if two ISO date strings represent the same date. */
  isSameDate(a: string, b: string): boolean {
    return a === b;
  }

  private _isDisabled(iso: string): boolean {
    if (this._min && iso < this._min) return true;
    if (this._max && iso > this._max) return true;
    return false;
  }
}

/** Parse an ISO YYYY-MM-DD string to a Date (local time). Returns null if invalid. */
function parseISO(iso: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number];
  return new Date(y, m - 1, d);
}

/** Format a Date as YYYY-MM-DD. */
function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
