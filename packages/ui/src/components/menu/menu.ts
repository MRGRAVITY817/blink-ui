import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { menuStyles } from './menu.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import { RovingTabindexController } from '../../controllers/roving-tabindex.js';
import { TypeaheadController } from '../../controllers/typeahead.js';
import type { BlMenuItem } from './menu-item.js';
import type { Placement, VirtualElement } from '@floating-ui/dom';

/**
 * A dropdown menu with trigger support.
 *
 * @element bl-menu
 * @slot trigger - The element that opens the menu.
 * @slot - `bl-menu-item`, `bl-menu-separator`, `bl-menu-group` elements.
 * @fires bl-menu-select - Emitted when a menu item is selected.
 */
@customElement('bl-menu')
export class BlMenu extends LitElement {
  static override styles = [tokens, menuStyles];

  private _overlay = new OverlayController(this);
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { if (this.open) this._close(); },
    active: false,
  });
  private _roving = new RovingTabindexController(this, {
    selector: 'bl-menu-item:not([aria-disabled="true"])',
  });
  private _typeahead = new TypeaheadController(this, {
    selector: 'bl-menu-item:not([aria-disabled="true"])',
    onMatch: (item) => { (item as BlMenuItem).focus(); },
  });

  private _menuId = `bl-menu-${Math.random().toString(36).slice(2, 9)}`;

  /** Whether the menu is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Preferred placement. */
  @property()
  placement: Placement = 'bottom-start';

  @state()
  private _visible = false;

  /**
   * A virtual reference element for positioning (used by context menu).
   * @internal
   */
  _virtualReference: VirtualElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('bl-menu-select', this._handleMenuSelect as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('bl-menu-select', this._handleMenuSelect as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._openMenu();
      } else if (this._visible) {
        this._closeMenu();
      }
    }
  }

  private _getTrigger(): HTMLElement | null {
    const slot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    return slot?.assignedElements()[0] as HTMLElement | null;
  }

  private _getItems(): BlMenuItem[] {
    return Array.from(this.querySelectorAll<BlMenuItem>('bl-menu-item:not([aria-disabled="true"])'));
  }

  private _handleTriggerClick = (): void => {
    if (this.open) {
      this._close();
    } else {
      this.open = true;
    }
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.open = true;
        return;
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this._close();
    }
  };

  private _handleMenuSelect = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this._close();
    this.dispatchEvent(
      new CustomEvent('bl-menu-select', {
        detail: { value: e.detail.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private async _openMenu(): Promise<void> {
    if (this._visible) return;
    this._visible = true;
    await this.updateComplete;

    const reference = this._virtualReference ?? this._getTrigger();
    const surface = this.shadowRoot!.querySelector<HTMLElement>('.menu-surface');
    if (!reference || !surface) return;

    const trigger = this._getTrigger();
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-haspopup', 'menu');
      trigger.setAttribute('aria-controls', this._menuId);
    }

    this._overlay.setPlacement(this.placement);
    this._overlay.show(reference as HTMLElement, surface);
    this._animation.enter(surface);
    this._clickOutside.active = true;

    // Focus first item
    requestAnimationFrame(() => {
      const items = this._getItems();
      if (items.length > 0) {
        this._roving.setCurrentIndex(0);
        items[0]?.focus();
      }
    });
  }

  private async _closeMenu(): Promise<void> {
    if (!this._visible) return;

    const surface = this.shadowRoot!.querySelector<HTMLElement>('.menu-surface');
    if (surface) {
      await this._animation.exit(surface);
    }

    this._overlay.hide();
    this._clickOutside.active = false;
    this._visible = false;
    this._virtualReference = null;

    const trigger = this._getTrigger();
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-controls');
      trigger.focus();
    }
  }

  private _close(): void {
    this.open = false;
  }

  private _handleSlotChange(): void {
    const trigger = this._getTrigger();
    if (!trigger) return;
    trigger.removeEventListener('click', this._handleTriggerClick);
    trigger.addEventListener('click', this._handleTriggerClick);
    trigger.setAttribute('aria-expanded', String(this.open));
    trigger.setAttribute('aria-haspopup', 'menu');
  }

  protected override render() {
    return html`
      <slot name="trigger" @slotchange=${this._handleSlotChange}></slot>
      ${this._visible
        ? html`
            <div
              class="menu-surface"
              id=${this._menuId}
              role="menu"
            >
              <slot></slot>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-menu': BlMenu;
  }
}
