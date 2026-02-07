import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarFooterStyles } from './sidebar.styles.js';

/**
 * Bottom area of a sidebar (user info).
 *
 * @element bl-sidebar-footer
 * @slot - Footer content.
 */
@customElement('bl-sidebar-footer')
export class BlSidebarFooter extends LitElement {
  static override styles = [tokens, sidebarFooterStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-footer': BlSidebarFooter;
  }
}
