import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarHeaderStyles } from './sidebar.styles.js';

/**
 * Top area of a sidebar (logo, title).
 *
 * @element bl-sidebar-header
 * @slot - Header content.
 */
@customElement('bl-sidebar-header')
export class BlSidebarHeader extends LitElement {
  static override styles = [tokens, sidebarHeaderStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-header': BlSidebarHeader;
  }
}
