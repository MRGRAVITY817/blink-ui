import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { radioStyles } from './radio.styles.js';

/**
 * An individual radio button. Must be inside `bl-radio-group`.
 *
 * @element bl-radio
 * @slot - Label text for the radio option.
 * @csspart radio - The radio indicator circle.
 */
@customElement('bl-radio')
export class BlRadio extends LitElement {
  static override styles = [tokens, radioStyles];

  /** The value this radio represents. */
  @property()
  value = '';

  /** Whether this radio is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  /** Called by the parent radio-group to update checked state. */
  setChecked(checked: boolean): void {
    this.setAttribute('aria-checked', String(checked));
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this._select();
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === ' ') {
      e.preventDefault();
      this._select();
    }
  };

  private _select(): void {
    this.dispatchEvent(
      new CustomEvent('bl-radio-select', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    return html`
      <span part="radio" class="radio">
        <span class="radio-dot"></span>
      </span>
      <span class="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-radio': BlRadio;
  }
}
