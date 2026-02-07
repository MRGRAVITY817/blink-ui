import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarGroupStyles } from './sidebar.styles.js';

/**
 * Section group within a sidebar with optional label.
 * When the `collapsible` attribute is set, clicking the label area
 * collapses or expands the group content with a height transition animation.
 *
 * @element bl-sidebar-group
 * @slot - Group content (menus, items).
 * @slot label - Group heading.
 * @fires bl-sidebar-group-toggle - Emitted when the group collapsed state changes.
 */
@customElement('bl-sidebar-group')
export class BlSidebarGroup extends LitElement {
  static override styles = [tokens, sidebarGroupStyles];

  /** Whether this group supports collapsing. */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /** Whether the group is currently collapsed. Only applies when `collapsible` is true. */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @state()
  private _contentHeight: number | null = null;

  @query('.group-content-inner')
  private _contentInner!: HTMLElement;

  private _handleLabelClick = (): void => {
    if (!this.collapsible) return;

    this.collapsed = !this.collapsed;
    this._updateHeight();

    this.dispatchEvent(
      new CustomEvent('bl-sidebar-group-toggle', {
        detail: { collapsed: this.collapsed },
        composed: true,
        bubbles: true,
      }),
    );
  };

  override firstUpdated(): void {
    if (this.collapsible) {
      this._updateHeight();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('collapsed') || changed.has('collapsible')) {
      this._updateHeight();
    }
  }

  private _updateHeight(): void {
    if (!this.collapsible || !this._contentInner) return;

    if (this.collapsed) {
      this._contentHeight = 0;
    } else {
      this._contentHeight = this._contentInner.scrollHeight;
    }
  }

  protected override render() {
    if (!this.collapsible) {
      // Simple non-collapsible group
      return html`
        <slot name="label"></slot>
        <slot></slot>
      `;
    }

    const contentStyle =
      this._contentHeight !== null
        ? `height: ${this._contentHeight}px`
        : '';

    return html`
      <div
        class="group-label"
        role="button"
        tabindex="0"
        aria-expanded=${!this.collapsed}
        @click=${this._handleLabelClick}
        @keydown=${this._handleKeyDown}
      >
        <span class="chevron" aria-hidden="true">
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
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
        <span class="group-label-text">
          <slot name="label"></slot>
        </span>
      </div>
      <div class="group-content" style=${contentStyle}>
        <div class="group-content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleLabelClick();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-group': BlSidebarGroup;
  }
}
