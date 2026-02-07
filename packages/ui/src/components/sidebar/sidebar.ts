import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarStyles } from './sidebar.styles.js';
import { AnimationController } from '../../controllers/animation.js';

export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

/**
 * Root sidebar container. Manages collapsed/expanded state.
 * Switches between inline sidebar and drawer mode at a configurable breakpoint.
 *
 * Supports three layout variants:
 * - `sidebar` (default): Standard fixed-width sidebar with border.
 * - `floating`: Floating sidebar with rounded corners and shadow.
 * - `inset`: Sidebar inset into the page background.
 *
 * Supports three collapsible modes:
 * - `offcanvas`: Sidebar fully hides when collapsed (width: 0).
 * - `icon`: Sidebar collapses to icon-only width.
 * - `none`: Sidebar cannot be collapsed.
 *
 * Registers a global keyboard shortcut (Cmd+B / Ctrl+B) to toggle.
 *
 * Exposes CSS variables:
 * - `--bl-sidebar-width` - Width when expanded (default: 260px).
 * - `--bl-sidebar-width-collapsed` - Width when collapsed in icon mode (default: 56px).
 *
 * @element bl-sidebar
 * @slot - Sidebar content (header, content, footer, rail).
 * @fires bl-sidebar-toggle - Emitted when collapsed state changes.
 */
@customElement('bl-sidebar')
export class BlSidebar extends LitElement {
  static override styles = [tokens, sidebarStyles];

  private _animation = new AnimationController(this);
  private _mediaQuery: MediaQueryList | null = null;
  private _boundKeyHandler = this._handleGlobalKeyDown.bind(this);

  /** Whether the sidebar is collapsed. */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /** Whether the sidebar drawer is open (in drawer mode). */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Display mode: 'inline' or 'drawer'. Automatically switches at breakpoint. */
  @property({ reflect: true })
  mode: 'inline' | 'drawer' = 'inline';

  /** Layout variant: 'sidebar', 'floating', or 'inset'. */
  @property({ reflect: true })
  variant: SidebarVariant = 'sidebar';

  /** Collapsible behavior: 'offcanvas', 'icon', or 'none'. */
  @property({ reflect: true })
  collapsible: SidebarCollapsible = 'icon';

  /** Breakpoint for switching to drawer mode (CSS media query width). */
  @property({ attribute: 'breakpoint' })
  breakpoint = '768px';

  @state()
  private _drawerVisible = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this._setupMediaQuery();
    document.addEventListener('keydown', this._boundKeyHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mediaQuery?.removeEventListener('change', this._handleMediaChange);
    document.removeEventListener('keydown', this._boundKeyHandler);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('breakpoint')) {
      this._setupMediaQuery();
    }
    if (changed.has('open') && this.mode === 'drawer') {
      if (this.open) {
        this._showDrawer();
      } else if (this._drawerVisible) {
        this._hideDrawer();
      }
    }
  }

  /** Toggle collapsed state. */
  toggle(): void {
    if (this.collapsible === 'none') return;

    if (this.mode === 'drawer') {
      this.open = !this.open;
    } else {
      this.collapsed = !this.collapsed;
    }
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-toggle', {
        detail: { collapsed: this.collapsed, open: this.open, mode: this.mode, variant: this.variant },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleGlobalKeyDown(e: KeyboardEvent): void {
    // Cmd+B (Mac) or Ctrl+B (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      this.toggle();
    }
  }

  private _setupMediaQuery(): void {
    this._mediaQuery?.removeEventListener('change', this._handleMediaChange);
    this._mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);
    this._mediaQuery.addEventListener('change', this._handleMediaChange);
    this._handleMediaChange();
  }

  private _handleMediaChange = (): void => {
    if (this._mediaQuery?.matches) {
      this.mode = 'drawer';
      this.open = false;
    } else {
      this.mode = 'inline';
      this._drawerVisible = false;
    }
  };

  private async _showDrawer(): Promise<void> {
    this._drawerVisible = true;
    await this.updateComplete;
    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    if (backdrop) this._animation.enter(backdrop);
  }

  private async _hideDrawer(): Promise<void> {
    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    if (backdrop) await this._animation.exit(backdrop);
    this._drawerVisible = false;
  }

  private _handleBackdropClick = (): void => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-toggle', {
        detail: { collapsed: this.collapsed, open: false, mode: this.mode, variant: this.variant },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      ${this.mode === 'drawer' && this._drawerVisible
        ? html`<div class="backdrop" @click=${this._handleBackdropClick}></div>`
        : nothing}
      <aside class="sidebar" part="base">
        <slot></slot>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar': BlSidebar;
  }
}
