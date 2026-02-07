import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { optionStyles } from './option.styles.js';

/**
 * An option within a `bl-select`.
 *
 * @element bl-option
 * @slot - Option label text.
 * @csspart option - The option container.
 */
@customElement('bl-option')
export class BlOption extends LitElement {
  static override styles = [tokens, optionStyles];

  private _optionId = `bl-opt-${Math.random().toString(36).slice(2, 9)}`;

  /** The value this option represents. */
  @property()
  value = '';

  /** Whether this option is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.id = this.id || this._optionId;
    this.addEventListener('click', this._handleClick);
    this.addEventListener('mouseenter', this._handleMouseEnter);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('mouseenter', this._handleMouseEnter);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  /** Get the display text of this option. */
  getLabel(): string {
    return (this.textContent ?? '').trim();
  }

  /** Set the highlighted (hover) state. */
  setHighlighted(highlighted: boolean): void {
    if (highlighted) {
      this.setAttribute('data-highlighted', '');
    } else {
      this.removeAttribute('data-highlighted');
    }
  }

  /** Set the selected state. */
  setSelected(selected: boolean): void {
    this.setAttribute('aria-selected', String(selected));
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-option-select', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleMouseEnter = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-option-highlight', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <div class="option" part="option">
        <svg
          class="check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-option': BlOption;
  }
}
