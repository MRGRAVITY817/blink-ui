import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarContentStyles } from './sidebar.styles.js';

/**
 * Scrollable middle area of a sidebar.
 *
 * @element bl-sidebar-content
 * @slot - Sidebar groups and menus.
 */
@customElement('bl-sidebar-content')
export class BlSidebarContent extends LitElement {
  static override styles = [tokens, sidebarContentStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-content': BlSidebarContent;
  }
}
