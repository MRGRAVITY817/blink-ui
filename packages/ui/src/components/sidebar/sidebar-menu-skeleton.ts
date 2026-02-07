import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuSkeletonStyles } from './sidebar.styles.js';

/**
 * Loading placeholder for sidebar menu items.
 * Displays a configurable number of skeleton rows with icon and text placeholders
 * using a pulse animation.
 *
 * @element bl-sidebar-menu-skeleton
 */
@customElement('bl-sidebar-menu-skeleton')
export class BlSidebarMenuSkeleton extends LitElement {
  static override styles = [tokens, sidebarMenuSkeletonStyles];

  /** Number of skeleton items to render. */
  @property({ type: Number })
  count = 5;

  protected override render() {
    const items = [];
    for (let i = 0; i < this.count; i++) {
      items.push(html`
        <div class="skeleton-item" part="item">
          <div class="skeleton-icon" aria-hidden="true"></div>
          <div class="skeleton-text" aria-hidden="true"></div>
        </div>
      `);
    }

    return html`
      <div role="status" aria-label="Loading menu items">
        ${items}
        <span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
          Loading...
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu-skeleton': BlSidebarMenuSkeleton;
  }
}
