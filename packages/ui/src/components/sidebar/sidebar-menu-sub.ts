import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuSubStyles } from './sidebar.styles.js';

/**
 * Collapsible nested sub-menu within a sidebar menu.
 * Contains a trigger button with a chevron and a collapsible content area
 * for nested child items with indentation.
 *
 * @element bl-sidebar-menu-sub
 * @slot trigger-icon - Icon for the sub-menu trigger.
 * @slot trigger - Label text for the sub-menu trigger.
 * @slot - Child menu items (nested content).
 * @fires bl-sidebar-sub-toggle - Emitted when the sub-menu open state changes.
 */
@customElement('bl-sidebar-menu-sub')
export class BlSidebarMenuSub extends LitElement {
  static override styles = [tokens, sidebarMenuSubStyles];

  /** Whether the sub-menu is expanded. */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  private _contentHeight = 0;

  @query('.sub-content-inner')
  private _contentInner!: HTMLElement;

  private _handleToggle = (): void => {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-sub-toggle', {
        detail: { open: this.open },
        composed: true,
        bubbles: true,
      }),
    );
  };

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      this._updateHeight();
    }
  }

  private _updateHeight(): void {
    if (!this._contentInner) return;
    if (this.open) {
      this._contentHeight = this._contentInner.scrollHeight;
    } else {
      // If closing, first set to current height then animate to 0
      this._contentHeight = 0;
    }
  }

  protected override render() {
    const contentStyle = this.open
      ? `height: ${this._contentHeight}px`
      : 'height: 0';

    return html`
      <button
        class="sub-trigger"
        part="trigger"
        @click=${this._handleToggle}
        aria-expanded=${this.open}
      >
        <span class="sub-trigger-icon"><slot name="trigger-icon"></slot></span>
        <span class="sub-trigger-label"><slot name="trigger"></slot></span>
        <span class="sub-trigger-chevron" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      </button>
      <div class="sub-content" style=${contentStyle}>
        <div class="sub-content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu-sub': BlSidebarMenuSub;
  }
}
