import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { dateFieldStyles } from './date-picker.styles.js';
import type { SegmentType } from './date-segment.js';

/**
 * Segmented date input container.
 * Display format is locale-driven via `Intl.DateTimeFormat.formatToParts()`.
 *
 * @element bl-date-field
 * @fires bl-date-input - Emitted during segment editing.
 * @fires bl-date-field-trigger - Emitted when the calendar trigger is clicked.
 */
@customElement('bl-date-field')
export class BlDateField extends LitElement {
  static override styles = [tokens, dateFieldStyles];

  /** Current date value (ISO YYYY-MM-DD). */
  @property()
  value = '';

  /** Locale for segment order (MDY vs DMY vs YMD). */
  @property()
  locale = '';

  /** Whether to show the calendar trigger button. */
  @property({ type: Boolean, attribute: 'show-trigger' })
  showTrigger = false;

  private _month = 0;
  private _day = 0;
  private _year = 0;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') && this.value) {
      const parts = this.value.split('-').map(Number);
      this._year = parts[0] ?? 0;
      this._month = parts[1] ?? 0;
      this._day = parts[2] ?? 0;
    }
  }

  /** Get segment order based on locale. */
  private _getSegmentOrder(): SegmentType[] {
    try {
      const fmt = new Intl.DateTimeFormat(this.locale || undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const parts = fmt.formatToParts(new Date(2000, 0, 1));
      const order: SegmentType[] = [];
      for (const part of parts) {
        if (part.type === 'month') order.push('month');
        else if (part.type === 'day') order.push('day');
        else if (part.type === 'year') order.push('year');
      }
      return order.length === 3 ? order : ['month', 'day', 'year'];
    } catch {
      return ['month', 'day', 'year'];
    }
  }

  private _getSegmentValue(type: SegmentType): number {
    switch (type) {
      case 'month': return this._month;
      case 'day': return this._day;
      case 'year': return this._year;
    }
  }

  private _getPlaceholder(type: SegmentType): string {
    switch (type) {
      case 'month': return 'MM';
      case 'day': return 'DD';
      case 'year': return 'YYYY';
    }
  }

  private _handleSegmentChange = (e: CustomEvent<{ type: SegmentType; value: number }>): void => {
    e.stopPropagation();
    const { type, value } = e.detail;
    switch (type) {
      case 'month': this._month = value; break;
      case 'day': this._day = value; break;
      case 'year': this._year = value; break;
    }

    if (this._month > 0 && this._day > 0 && this._year > 0) {
      const m = String(this._month).padStart(2, '0');
      const d = String(this._day).padStart(2, '0');
      const y = String(this._year).padStart(4, '0');
      this.value = `${y}-${m}-${d}`;
      this.dispatchEvent(
        new CustomEvent('bl-date-input', {
          detail: { value: this.value },
          composed: true,
          bubbles: true,
        }),
      );
    }
  };

  private _handleSegmentNext = (e: Event): void => {
    e.stopPropagation();
    // Move focus to next segment
    const segments = Array.from(this.shadowRoot!.querySelectorAll('bl-date-segment'));
    const current = (e.target as HTMLElement).closest?.('bl-date-segment') ?? e.composedPath().find(
      (el) => el instanceof HTMLElement && el.tagName === 'BL-DATE-SEGMENT',
    ) as HTMLElement | undefined;
    if (!current) return;
    const idx = segments.indexOf(current as any);
    if (idx !== -1 && idx + 1 < segments.length) {
      const next = segments[idx + 1] as HTMLElement;
      requestAnimationFrame(() => next.shadowRoot?.querySelector<HTMLElement>('.segment')?.focus());
    }
  };

  private _handleTriggerClick = (): void => {
    this.dispatchEvent(
      new CustomEvent('bl-date-field-trigger', {
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    const order = this._getSegmentOrder();

    return html`
      <div
        class="date-field"
        part="field"
        @bl-segment-change=${this._handleSegmentChange}
        @bl-segment-next=${this._handleSegmentNext}
      >
        ${order.map((type, i) => html`
          ${i > 0 ? html`<span class="separator">/</span>` : ''}
          <bl-date-segment
            .type=${type}
            .value=${this._getSegmentValue(type)}
            .placeholder=${this._getPlaceholder(type)}
          ></bl-date-segment>
        `)}
        ${this.showTrigger
          ? html`
              <button class="calendar-trigger" aria-label="Open calendar" @click=${this._handleTriggerClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-date-field': BlDateField;
  }
}
