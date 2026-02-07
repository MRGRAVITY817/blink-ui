import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarRailStyles } from './sidebar.styles.js';

/**
 * Thin vertical strip on the sidebar edge that toggles sidebar on click.
 * Double-click resets the sidebar to its default width.
 * Placed inside `bl-sidebar` to provide a drag/click target at the edge.
 *
 * @element bl-sidebar-rail
 * @fires bl-sidebar-toggle - Emitted when the rail is clicked to toggle the sidebar.
 */
@customElement('bl-sidebar-rail')
export class BlSidebarRail extends LitElement {
  static override styles = [tokens, sidebarRailStyles];

  private _clickTimer: ReturnType<typeof setTimeout> | null = null;

  private _handleClick = (): void => {
    // Debounce to distinguish single click from double click
    if (this._clickTimer) {
      clearTimeout(this._clickTimer);
      this._clickTimer = null;
      this._handleDoubleClick();
      return;
    }

    this._clickTimer = setTimeout(() => {
      this._clickTimer = null;
      this._toggleSidebar();
    }, 250);
  };

  private _handleDoubleClick(): void {
    // Double-click toggles the sidebar as well
    this._toggleSidebar();
  }

  private _toggleSidebar(): void {
    const sidebar = this.closest('bl-sidebar');
    if (sidebar) {
      (sidebar as any).toggle();
    }

    this.dispatchEvent(
      new CustomEvent('bl-sidebar-toggle', {
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleSidebar();
    }
  };

  protected override render() {
    return html`
      <div
        class="rail"
        part="rail"
        role="button"
        tabindex="0"
        aria-label="Toggle sidebar"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-rail': BlSidebarRail;
  }
}
