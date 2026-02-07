import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { switchStyles } from './switch.styles.js';

export type SwitchSize = 'sm' | 'md';

/**
 * An on/off toggle switch with `role="switch"` and `aria-checked`.
 *
 * @element bl-switch
 * @slot - Label text for the switch.
 * @csspart track - The switch track.
 * @csspart thumb - The switch thumb.
 * @fires bl-change - Emitted when the checked state changes.
 */
@customElement('bl-switch')
export class BlSwitch extends LitElement {
  static override styles = [tokens, switchStyles];

  /** Whether the switch is on. */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Whether the switch is disabled. */
  @property({ type: Boolean })
  disabled = false;

  /** Size of the switch. */
  @property({ reflect: true })
  size: SwitchSize = 'md';

  /** Form name. */
  @property()
  name = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
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
    if (changed.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
      if (this.checked) {
        this.setAttribute('data-checked', '');
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
    this.checked = !this.checked;
    this._fireChange();
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
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
    return html`
      <span part="track" class="track">
        <span part="thumb" class="thumb"></span>
      </span>
      <span class="label"><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-switch': BlSwitch;
  }
}
