import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { calendarCellStyles } from './date-picker.styles.js';

/**
 * Individual day cell in a calendar grid.
 * Supports single selection and range selection visual states.
 *
 * @element bl-calendar-cell
 */
@customElement('bl-calendar-cell')
export class BlCalendarCell extends LitElement {
  static override styles = [tokens, calendarCellStyles];

  /** ISO date string for this cell. */
  @property()
  date = '';

  /** Day number to display. */
  @property({ type: Number })
  day = 0;

  /** Whether this day is outside the current month. */
  @property({ type: Boolean, reflect: true, attribute: 'outside-month' })
  outsideMonth = false;

  /** Whether this is today. */
  @property({ type: Boolean, reflect: true })
  today = false;

  /** Whether this day is selected. */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /** Whether this day is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether this day is within a selected range (between start and end). */
  @property({ type: Boolean, reflect: true, attribute: 'in-range' })
  inRange = false;

  /** Whether this day is the start of a selected range. */
  @property({ type: Boolean, reflect: true, attribute: 'range-start' })
  rangeStart = false;

  /** Whether this day is the end of a selected range. */
  @property({ type: Boolean, reflect: true, attribute: 'range-end' })
  rangeEnd = false;

  /** Whether this day is within a hover-preview range. */
  @property({ type: Boolean, reflect: true, attribute: 'range-preview' })
  rangePreview = false;

  /** Whether this day is the start of the hover-preview range. */
  @property({ type: Boolean, reflect: true, attribute: 'range-preview-start' })
  rangePreviewStart = false;

  /** Whether this day is the end of the hover-preview range. */
  @property({ type: Boolean, reflect: true, attribute: 'range-preview-end' })
  rangePreviewEnd = false;

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-cell-click', {
        detail: { date: this.date },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleMouseEnter = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-cell-hover', {
        detail: { date: this.date },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <button
        part="button"
        ?disabled=${this.disabled}
        aria-label=${this.date}
        aria-selected=${this.selected || this.rangeStart || this.rangeEnd ? 'true' : 'false'}
        tabindex=${this.selected || this.rangeStart ? '0' : '-1'}
        @click=${this._handleClick}
        @mouseenter=${this._handleMouseEnter}
      >
        ${this.day}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-calendar-cell': BlCalendarCell;
  }
}
