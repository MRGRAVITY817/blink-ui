import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { dateSegmentStyles } from './date-picker.styles.js';

export type SegmentType = 'month' | 'day' | 'year';

/**
 * Individual date segment with `role="spinbutton"`.
 * ArrowUp/Down increments, digit typing fills the value.
 *
 * @element bl-date-segment
 * @fires bl-segment-change - Emitted when the segment value changes.
 */
@customElement('bl-date-segment')
export class BlDateSegment extends LitElement {
  static override styles = [tokens, dateSegmentStyles];

  /** Type of segment. */
  @property()
  type: SegmentType = 'day';

  /** Current numeric value. */
  @property({ type: Number })
  value = 0;

  /** Placeholder text when empty. */
  @property()
  placeholder = '';

  @state()
  private _buffer = '';
  private _bufferTimer: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'spinbutton');
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('focus', this._handleFocus);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('focus', this._handleFocus);
    if (this._bufferTimer) clearTimeout(this._bufferTimer);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('type')) {
      const { min, max } = this._getRange();
      this.setAttribute('aria-valuemin', String(min));
      this.setAttribute('aria-valuemax', String(max));
      this.setAttribute('aria-valuenow', String(this.value));
      this.setAttribute('aria-valuetext', this.value > 0 ? this._formatDisplay() : this.placeholder);
    }
  }

  private _getRange(): { min: number; max: number } {
    switch (this.type) {
      case 'month': return { min: 1, max: 12 };
      case 'day': return { min: 1, max: 31 };
      case 'year': return { min: 1900, max: 2099 };
    }
  }

  private _formatDisplay(): string {
    if (this.value <= 0) return '';
    switch (this.type) {
      case 'month': return String(this.value).padStart(2, '0');
      case 'day': return String(this.value).padStart(2, '0');
      case 'year': return String(this.value).padStart(4, '0');
    }
  }

  private _handleFocus = (): void => {
    this._buffer = '';
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    const { min, max } = this._getRange();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      let next = this.value + 1;
      if (next > max) next = min;
      this._emitChange(next);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      let next = this.value - 1;
      if (next < min) next = max;
      this._emitChange(next);
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault();
      this._appendDigit(e.key);
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      // Let focus move to next segment (handled by parent)
    } else if (e.key === 'ArrowLeft') {
      // Let focus move to prev segment (handled by parent)
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      this._emitChange(0);
    }
  };

  private _appendDigit(digit: string): void {
    this._buffer += digit;

    if (this._bufferTimer) clearTimeout(this._bufferTimer);
    this._bufferTimer = setTimeout(() => {
      this._buffer = '';
    }, 800);

    const num = parseInt(this._buffer, 10);
    const { min, max } = this._getRange();
    const maxDigits = this.type === 'year' ? 4 : 2;

    if (this._buffer.length >= maxDigits || num > max) {
      // Commit
      const clamped = Math.max(min, Math.min(max, num));
      this._emitChange(clamped);
      this._buffer = '';
      if (this._bufferTimer) clearTimeout(this._bufferTimer);

      // Move to next segment
      this.dispatchEvent(new CustomEvent('bl-segment-next', { composed: true, bubbles: true }));
    } else {
      this._emitChange(num);
    }
  }

  private _emitChange(value: number): void {
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('bl-segment-change', {
        detail: { type: this.type, value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    const display = this._formatDisplay();
    const isEmpty = !display;

    return html`
      <span
        class="segment ${isEmpty ? 'placeholder' : ''}"
        part="segment"
        tabindex="0"
      >${isEmpty ? this.placeholder : display}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-date-segment': BlDateSegment;
  }
}
