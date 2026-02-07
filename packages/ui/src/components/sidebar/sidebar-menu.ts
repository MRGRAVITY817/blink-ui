import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuStyles } from './sidebar.styles.js';

/**
 * Navigation menu within a sidebar.
 *
 * @element bl-sidebar-menu
 * @slot - `bl-sidebar-menu-item` elements.
 */
@customElement('bl-sidebar-menu')
export class BlSidebarMenu extends LitElement {
  static override styles = [tokens, sidebarMenuStyles];

  protected override render() {
    return html`
      <nav>
        <ul role="list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu': BlSidebarMenu;
  }
}
