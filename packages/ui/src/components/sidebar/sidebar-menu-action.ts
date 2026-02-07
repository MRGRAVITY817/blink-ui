import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuActionStyles } from './sidebar.styles.js';

/**
 * Action button that appears on hover of a menu item or group header.
 * Typically used for contextual actions like "add", "settings", etc.
 *
 * By default, the action button is hidden and revealed when its parent
 * element is hovered. Set `show-on-hover` to `false` to always show.
 *
 * Parent elements (bl-sidebar-menu-item, bl-sidebar-group) should place
 * this in a `action` slot and manage hover visibility via the
 * `data-visible` attribute.
 *
 * @element bl-sidebar-menu-action
 * @slot - Action content (icon, text, etc.).
 * @fires bl-sidebar-action-click - Emitted when the action is clicked.
 */
@customElement('bl-sidebar-menu-action')
export class BlSidebarMenuAction extends LitElement {
  static override styles = [tokens, sidebarMenuActionStyles];

  /** Whether to show only on hover of the parent element. */
  @property({ type: Boolean, reflect: true, attribute: 'show-on-hover' })
  showOnHover = true;

  private _handleClick = (e: Event): void => {
    // Prevent the click from bubbling to parent menu item
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-action-click', {
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <button
        part="button"
        aria-label="Menu action"
        @click=${this._handleClick}
      >
        <slot>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu-action': BlSidebarMenuAction;
  }
}
