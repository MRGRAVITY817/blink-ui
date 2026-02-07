import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { contextMenuStyles } from './context-menu.styles.js';
import type { BlMenu } from '../menu/menu.js';

/**
 * A context menu that opens on right-click of its slotted target.
 * Reuses `bl-menu` and all `bl-menu-*` sub-elements.
 *
 * @element bl-context-menu
 * @slot target - The element that triggers the context menu on right-click.
 * @slot - `bl-menu-item`, `bl-menu-separator`, `bl-menu-group` elements.
 * @fires bl-menu-select - Emitted when a menu item is selected.
 */
@customElement('bl-context-menu')
export class BlContextMenu extends LitElement {
  static override styles = [tokens, contextMenuStyles];

  /** Whether the menu is currently open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this._handleContextMenu);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('contextmenu', this._handleContextMenu);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
    const menu = this.querySelector<BlMenu>('bl-menu');
    if (!menu) return;

    // Position at cursor using Floating UI virtual element
    menu._virtualReference = {
      getBoundingClientRect: () => ({
        x: e.clientX,
        y: e.clientY,
        top: e.clientY,
        left: e.clientX,
        bottom: e.clientY,
        right: e.clientX,
        width: 0,
        height: 0,
      }),
    };
    menu.placement = 'bottom-start';
    menu.open = true;
    this.open = true;

    const onClose = () => {
      this.open = false;
      menu.removeEventListener('bl-popover-hide', onClose);
    };
    // Listen for menu close
    const observer = new MutationObserver(() => {
      if (!menu.open) {
        this.open = false;
        observer.disconnect();
      }
    });
    observer.observe(menu, { attributes: true, attributeFilter: ['open'] });
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    // Shift+F10 opens context menu at target position
    if (e.key === 'F10' && e.shiftKey) {
      e.preventDefault();
      const target = this.querySelector<HTMLElement>('[slot="target"]') ?? this;
      const rect = target.getBoundingClientRect();
      // Simulate a context menu event at the center of the target
      const syntheticEvent = new MouseEvent('contextmenu', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
        cancelable: true,
      });
      this.dispatchEvent(syntheticEvent);
    }
  };

  protected override render() {
    return html`
      <slot name="target"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-context-menu': BlContextMenu;
  }
}
