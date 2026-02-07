import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { menuItemStyles } from './menu-item.styles.js';

export type MenuItemVariant = 'default' | 'danger';

/**
 * A single item in a dropdown or context menu.
 *
 * @element bl-menu-item
 * @slot - Item label content.
 * @csspart item - The menu item container.
 */
@customElement('bl-menu-item')
export class BlMenuItem extends LitElement {
  static override styles = [tokens, menuItemStyles];

  /** The value this item represents. */
  @property()
  value = '';

  /** Whether this item is disabled. */
  @property({ type: Boolean })
  disabled = false;

  /** Visual variant. */
  @property({ reflect: true })
  variant: MenuItemVariant = 'default';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'menuitem');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  /** Set the highlighted (focus) state. */
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
      new CustomEvent('bl-menu-select', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <div class="menu-item" part="item">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-menu-item': BlMenuItem;
  }
}
