import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuItemStyles } from './sidebar.styles.js';

/**
 * Navigation link within a sidebar menu.
 * Set `active` to mark the current page.
 *
 * @element bl-sidebar-menu-item
 * @slot - Label text.
 * @slot icon - Icon element.
 * @slot badge - Badge element.
 */
@customElement('bl-sidebar-menu-item')
export class BlSidebarMenuItem extends LitElement {
  static override styles = [tokens, sidebarMenuItemStyles];

  /** URL to navigate to. If set, renders as an anchor. */
  @property()
  href = '';

  /** Whether this item represents the current page. */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Whether this item is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('active')) {
      if (this.active) {
        this.setAttribute('aria-current', 'page');
      } else {
        this.removeAttribute('aria-current');
      }
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-item-click', {
        detail: { href: this.href },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    const inner = html`
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot></slot></span>
      <span class="badge"><slot name="badge"></slot></span>
    `;

    if (this.href && !this.disabled) {
      return html`
        <a class="menu-item" part="base" href=${this.href} @click=${this._handleClick}>
          ${inner}
        </a>
      `;
    }

    return html`
      <button class="menu-item" part="base" ?disabled=${this.disabled} @click=${this._handleClick}>
        ${inner}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu-item': BlSidebarMenuItem;
  }
}
