import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { calendarPresetsStyles } from './date-picker.styles.js';

export type PresetKey =
  | 'today'
  | 'yesterday'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'last-month'
  | 'custom';

export interface PresetOption {
  key: PresetKey;
  label: string;
}

const DEFAULT_PRESETS: PresetOption[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last-7-days', label: 'Last 7 days' },
  { key: 'last-30-days', label: 'Last 30 days' },
  { key: 'this-month', label: 'This month' },
  { key: 'last-month', label: 'Last month' },
  { key: 'custom', label: 'Custom' },
];

/**
 * Preset button list for quick date range selection.
 * Each preset computes a start/end date range.
 *
 * @element bl-calendar-presets
 * @fires bl-preset-select - Emitted when a preset is clicked. Detail: { key, start, end }.
 */
@customElement('bl-calendar-presets')
export class BlCalendarPresets extends LitElement {
  static override styles = [tokens, calendarPresetsStyles];

  /** The currently active preset key. */
  @property({ attribute: 'active-preset' })
  activePreset: PresetKey | '' = '';

  /** Custom list of presets (defaults to built-in list). */
  @property({ type: Array })
  presets: PresetOption[] = DEFAULT_PRESETS;

  private _handlePresetClick(preset: PresetOption): void {
    const range = this._computeRange(preset.key);
    this.activePreset = preset.key;

    this.dispatchEvent(
      new CustomEvent('bl-preset-select', {
        detail: {
          key: preset.key,
          start: range.start,
          end: range.end,
        },
        composed: true,
        bubbles: true,
      }),
    );
  }

  /** Compute the ISO date range for a given preset key. */
  private _computeRange(key: PresetKey): { start: string; end: string } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (key) {
      case 'today':
        return { start: toISO(today), end: toISO(today) };

      case 'yesterday': {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: toISO(yesterday), end: toISO(yesterday) };
      }

      case 'last-7-days': {
        const start = new Date(today);
        start.setDate(start.getDate() - 6);
        return { start: toISO(start), end: toISO(today) };
      }

      case 'last-30-days': {
        const start = new Date(today);
        start.setDate(start.getDate() - 29);
        return { start: toISO(start), end: toISO(today) };
      }

      case 'this-month': {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return { start: toISO(start), end: toISO(end) };
      }

      case 'last-month': {
        const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const end = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: toISO(start), end: toISO(end) };
      }

      case 'custom':
      default:
        return { start: '', end: '' };
    }
  }

  protected override render() {
    return html`
      <div class="presets" part="presets" role="listbox" aria-label="Date range presets">
        ${this.presets.map(
          (preset) => html`
            <button
              class="preset-btn"
              role="option"
              aria-pressed=${this.activePreset === preset.key ? 'true' : 'false'}
              aria-selected=${this.activePreset === preset.key ? 'true' : 'false'}
              @click=${() => this._handlePresetClick(preset)}
            >
              ${preset.label}
            </button>
          `,
        )}
      </div>
    `;
  }
}

/** Format a Date as YYYY-MM-DD. */
function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-calendar-presets': BlCalendarPresets;
  }
}
