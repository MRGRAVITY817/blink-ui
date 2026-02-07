import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { toggleStyles } from './toggle.styles.js';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * A pressable toggle button with `aria-pressed`.
 *
 * @element bl-toggle
 * @slot - Toggle button content.
 * @csspart button - The native `<button>` element.
 * @fires bl-change - Emitted when the pressed state changes.
 */
@customElement('bl-toggle')
export class BlToggle extends LitElement {
  static override styles = [tokens, toggleStyles];

  /** Whether the toggle is pressed. */
  @property({ type: Boolean, reflect: true })
  pressed = false;

  /** Whether the toggle is disabled. */
  @property({ type: Boolean })
  disabled = false;

  /** Visual variant. */
  @property({ reflect: true })
  variant: ToggleVariant = 'default';

  /** Size of the toggle. */
  @property({ reflect: true })
  size: ToggleSize = 'md';

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('pressed')) {
      if (this.pressed) {
        this.setAttribute('data-pressed', '');
      } else {
        this.removeAttribute('data-pressed');
      }
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  private _handleClick(): void {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { pressed: this.pressed },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleClick();
    }
  }

  protected override render() {
    return html`
      <button
        part="button"
        type="button"
        aria-pressed=${this.pressed ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-toggle': BlToggle;
  }
}
