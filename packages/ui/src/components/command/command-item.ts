import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandItemStyles } from './command.styles.js';

/**
 * Individual action/result in a command palette.
 *
 * @element bl-command-item
 * @slot - Item label text.
 * @slot icon - Icon element.
 * @slot shortcut - Keyboard shortcut display.
 */
@customElement('bl-command-item')
export class BlCommandItem extends LitElement {
  static override styles = [tokens, commandItemStyles];

  /** Value identifier for this item. */
  @property()
  value = '';

  /** Whether this item is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'option');
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

  /** Set highlighted state. */
  setHighlighted(highlighted: boolean): void {
    if (highlighted) {
      this.setAttribute('data-highlighted', '');
    } else {
      this.removeAttribute('data-highlighted');
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-command-item-click', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _handleMouseEnter = (): void => {
    if (this.disabled) return;
    // Highlight on hover
    const items = Array.from(
      this.closest('bl-command, bl-command-dialog')?.querySelectorAll<BlCommandItem>('bl-command-item') ?? [],
    );
    items.forEach((item) => item.setHighlighted(false));
    this.setHighlighted(true);
  };

  protected override render() {
    return html`
      <div class="item" part="item">
        <span class="icon"><slot name="icon"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="shortcut"><slot name="shortcut"></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-item': BlCommandItem;
  }
}
