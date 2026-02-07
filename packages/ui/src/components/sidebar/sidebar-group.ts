import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarGroupStyles } from './sidebar.styles.js';

/**
 * Section group within a sidebar with optional label.
 *
 * @element bl-sidebar-group
 * @slot - Group content (menus, items).
 * @slot label - Group heading.
 */
@customElement('bl-sidebar-group')
export class BlSidebarGroup extends LitElement {
  static override styles = [tokens, sidebarGroupStyles];

  protected override render() {
    return html`
      <slot name="label"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-group': BlSidebarGroup;
  }
}
