import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { radioGroupStyles } from './radio-group.styles.js';
import { RovingTabindexController } from '../../controllers/roving-tabindex.js';
import type { BlRadio } from '../radio/radio.js';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

/**
 * A radio group that manages selection among `bl-radio` children.
 * Uses `RovingTabindexController` for arrow key navigation.
 *
 * @element bl-radio-group
 * @slot - `bl-radio` elements.
 * @fires bl-change - Emitted when the selected value changes.
 */
@customElement('bl-radio-group')
export class BlRadioGroup extends LitElement {
  static override styles = [tokens, radioGroupStyles];

  private _roving = new RovingTabindexController(this, {
    selector: 'bl-radio:not([aria-disabled="true"])',
    orientation: 'vertical',
  });

  /** The form name for the group. */
  @property()
  name = '';

  /** The currently selected value. */
  @property()
  value = '';

  /** Whether all radios in the group are disabled. */
  @property({ type: Boolean })
  disabled = false;

  /** Orientation of the radio group. */
  @property({ reflect: true })
  orientation: RadioGroupOrientation = 'vertical';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    this.addEventListener('bl-radio-select', this._handleRadioSelect as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-radio-select', this._handleRadioSelect as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('disabled')) {
      this._syncRadios();
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
    if (changed.has('orientation')) {
      this._roving = new RovingTabindexController(this, {
        selector: 'bl-radio:not([aria-disabled="true"])',
        orientation: this.orientation,
      });
    }
  }

  private _handleRadioSelect = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    if (this.disabled) return;
    this.value = e.detail.value;
    this._syncRadios();
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _syncRadios(): void {
    const radios = this.querySelectorAll<BlRadio>('bl-radio');
    radios.forEach((radio) => {
      radio.setChecked(radio.value === this.value);
      if (this.disabled) {
        radio.disabled = true;
      }
    });

    // Set tabindex: the selected radio gets 0, others -1
    const items = this._roving.getItems();
    const selectedIndex = items.findIndex(
      (el) => (el as BlRadio).value === this.value,
    );
    if (selectedIndex !== -1) {
      this._roving.setCurrentIndex(selectedIndex);
    }
  }

  protected override render() {
    return html`<slot @slotchange=${this._syncRadios}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-radio-group': BlRadioGroup;
  }
}
