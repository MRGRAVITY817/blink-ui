import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarGroupLabelStyles } from './sidebar.styles.js';

/**
 * Group heading for a sidebar group.
 *
 * @element bl-sidebar-group-label
 * @slot - Label text.
 */
@customElement('bl-sidebar-group-label')
export class BlSidebarGroupLabel extends LitElement {
  static override styles = [tokens, sidebarGroupLabelStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-group-label': BlSidebarGroupLabel;
  }
}
