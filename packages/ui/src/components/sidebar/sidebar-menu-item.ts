import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { sidebarMenuItemStyles } from './sidebar.styles.js';

/**
 * Navigation link within a sidebar menu.
 * Set `active` to mark the current page. The `isActive` attribute is an
 * alias for `active` and both work identically.
 *
 * When the parent sidebar is in icon-only collapsed mode, a tooltip
 * showing the item label appears on hover.
 *
 * Slot `action` can hold a `bl-sidebar-menu-action` element that is
 * revealed on hover.
 *
 * @element bl-sidebar-menu-item
 * @slot - Label text.
 * @slot icon - Icon element.
 * @slot badge - Badge element.
 * @slot action - Action element (e.g., bl-sidebar-menu-action).
 */
@customElement('bl-sidebar-menu-item')
export class BlSidebarMenuItem extends LitElement {
  static override styles = [tokens, sidebarMenuItemStyles];

  /** URL to navigate to. If set, renders as an anchor. */
  @property()
  href = '';

  /** Whether this item represents the current page. */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Alias for `active`. */
  @property({ type: Boolean, reflect: true })
  isActive = false;

  /** Whether this item is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Tooltip text to show when sidebar is in icon-only collapsed mode. If empty, uses the slotted label text. */
  @property({ attribute: 'tooltip' })
  tooltipText = '';

  @state()
  private _showTooltip = false;

  @state()
  private _isIconOnly = false;

  @state()
  private _labelText = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
  }

  override updated(changed: Map<string, unknown>): void {
    // Sync active and isActive
    if (changed.has('active') && this.active && !this.isActive) {
      this.isActive = true;
    }
    if (changed.has('isActive') && this.isActive && !this.active) {
      this.active = true;
    }

    // Update aria-current
    const isActive = this.active || this.isActive;
    if (isActive) {
      this.setAttribute('aria-current', 'page');
    } else {
      this.removeAttribute('aria-current');
    }

    // Detect icon-only mode from parent sidebar
    this._detectIconOnly();
  }

  private _detectIconOnly(): void {
    const sidebar = this.closest('bl-sidebar');
    if (sidebar) {
      this._isIconOnly =
        sidebar.hasAttribute('collapsed') &&
        sidebar.getAttribute('collapsible') === 'icon';
    } else {
      this._isIconOnly = false;
    }
  }

  private _handleMouseEnter = (): void => {
    this._detectIconOnly();
    if (this._isIconOnly) {
      // Capture label text from the default slot
      this._captureLabelText();
      this._showTooltip = true;
    }
    // Show action buttons
    const action = this.querySelector('bl-sidebar-menu-action');
    if (action) {
      action.setAttribute('data-visible', '');
    }
  };

  private _handleMouseLeave = (): void => {
    this._showTooltip = false;
    // Hide action buttons
    const action = this.querySelector('bl-sidebar-menu-action');
    if (action) {
      action.removeAttribute('data-visible');
    }
  };

  private _captureLabelText(): void {
    if (this.tooltipText) {
      this._labelText = this.tooltipText;
      return;
    }
    // Get text content from the default slot
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    if (slot) {
      const nodes = slot.assignedNodes({ flatten: true });
      this._labelText = nodes.map((n) => n.textContent?.trim()).filter(Boolean).join(' ') || '';
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-sidebar-item-click', {
        detail: { href: this.href },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    const inner = html`
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot></slot></span>
      <span class="badge"><slot name="badge"></slot></span>
      <slot name="action"></slot>
    `;

    const tooltip = this._showTooltip && this._isIconOnly && this._labelText
      ? html`<div class="tooltip" data-visible role="tooltip">${this._labelText}</div>`
      : nothing;

    if (this.href && !this.disabled) {
      return html`
        <a class="menu-item" part="base" href=${this.href} @click=${this._handleClick}>
          ${inner}
        </a>
        ${tooltip}
      `;
    }

    return html`
      <button class="menu-item" part="base" ?disabled=${this.disabled} @click=${this._handleClick}>
        ${inner}
      </button>
      ${tooltip}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-sidebar-menu-item': BlSidebarMenuItem;
  }
}
