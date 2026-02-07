import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { checkboxStyles } from './checkbox.styles.js';

export type CheckboxSize = 'sm' | 'md';

/**
 * A checkbox with `aria-checked` supporting indeterminate (mixed) state.
 *
 * @element bl-checkbox
 * @slot - Label text for the checkbox.
 * @csspart checkbox - The checkbox indicator.
 * @fires bl-change - Emitted when the checked state changes.
 */
@customElement('bl-checkbox')
export class BlCheckbox extends LitElement {
  static override styles = [tokens, checkboxStyles];

  /** Whether the checkbox is checked. */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Whether the checkbox is in the indeterminate (mixed) state. */
  @property({ type: Boolean })
  indeterminate = false;

  /** Whether the checkbox is disabled. */
  @property({ type: Boolean })
  disabled = false;

  /** Form value of the checkbox. */
  @property()
  value = '';

  /** Form name. */
  @property()
  name = '';

  /** Size of the checkbox. */
  @property({ reflect: true })
  size: CheckboxSize = 'md';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
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
    if (changed.has('checked') || changed.has('indeterminate')) {
      const ariaValue = this.indeterminate ? 'mixed' : String(this.checked);
      this.setAttribute('aria-checked', ariaValue);
      if (this.checked || this.indeterminate) {
        this.setAttribute('data-checked', this.indeterminate ? 'mixed' : '');
      } else {
        this.removeAttribute('data-checked');
      }
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this._fireChange();
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === ' ') {
      e.preventDefault();
      this.indeterminate = false;
      this.checked = !this.checked;
      this._fireChange();
    }
  };

  private _fireChange(): void {
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { checked: this.checked },
        composed: true,
        bubbles: true,
      }),
    );
  }

  protected override render() {
    // Checkmark SVG for checked, minus for indeterminate
    const icon = this.indeterminate
      ? html`<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="2" rx="1" /></svg>`
      : html`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z" /></svg>`;

    return html`
      <span part="checkbox" class="checkbox">
        <span class="check-icon">${icon}</span>
      </span>
      <span class="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox': BlCheckbox;
  }
}
