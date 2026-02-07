import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarTriggerStyles } from './sidebar.styles.js';

/**
 * Toggle button for sidebar collapse/expand.
 *
 * @element bl-sidebar-trigger
 */
@customElement('bl-sidebar-trigger')
export class BlSidebarTrigger extends LitElement {
  static override styles = [tokens, sidebarTriggerStyles];

  private _handleClick = (): void => {
    const sidebar = this.closest('bl-sidebar');
    if (sidebar) {
      (sidebar as any).toggle();
    }
  };

  protected override render() {
    return html`
      <button
        part="button"
        aria-label="Toggle sidebar"
        @click=${this._handleClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-trigger': BlSidebarTrigger;
  }
}
