import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tabsStyles } from './tabs.styles.js';
import { RovingTabindexController } from '../../controllers/roving-tabindex.js';
import type { BlTab } from './tab.js';
import type { BlTabPanel } from './tab-panel.js';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivation = 'automatic' | 'manual';

/**
 * A tabbed interface container managing `bl-tab` and `bl-tab-panel` children.
 *
 * @element bl-tabs
 * @slot - `bl-tab` and `bl-tab-panel` elements.
 * @fires bl-change - Emitted when the selected tab changes.
 */
@customElement('bl-tabs')
export class BlTabs extends LitElement {
  static override styles = [tokens, tabsStyles];

  private _roving = new RovingTabindexController(this, {
    selector: 'bl-tab:not([aria-disabled="true"])',
    orientation: 'horizontal',
  });

  /** The currently selected tab value. */
  @property()
  value = '';

  /** Layout orientation. */
  @property({ reflect: true })
  orientation: TabsOrientation = 'horizontal';

  /** Activation mode: 'automatic' selects on focus, 'manual' requires Enter/Space. */
  @property()
  activation: TabsActivation = 'automatic';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('bl-tab-select', this._handleTabSelect as EventListener);
    this.addEventListener('focusin', this._handleFocusIn);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-tab-select', this._handleTabSelect as EventListener);
    this.removeEventListener('focusin', this._handleFocusIn);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._syncTabs();
    }
    if (changed.has('orientation')) {
      this._roving = new RovingTabindexController(this, {
        selector: 'bl-tab:not([aria-disabled="true"])',
        orientation: this.orientation,
      });
    }
  }

  private _getTabs(): BlTab[] {
    return Array.from(this.querySelectorAll<BlTab>('bl-tab'));
  }

  private _getPanels(): BlTabPanel[] {
    return Array.from(this.querySelectorAll<BlTabPanel>('bl-tab-panel'));
  }

  private _handleTabSelect = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this._selectTab(e.detail.value);
  };

  private _handleFocusIn = (e: FocusEvent): void => {
    if (this.activation !== 'automatic') return;
    const tab = (e.target as HTMLElement)?.closest?.('bl-tab') as BlTab | null;
    if (tab && tab.value && !tab.disabled) {
      this._selectTab(tab.value);
    }
  };

  private _selectTab(value: string): void {
    if (this.value === value) return;
    this.value = value;
    this._syncTabs();
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _syncTabs(): void {
    const tabs = this._getTabs();
    const panels = this._getPanels();

    // If no value set, default to first tab
    if (!this.value && tabs.length > 0) {
      this.value = tabs[0]!.value;
    }

    tabs.forEach((tab) => {
      const panel = panels.find((p) => p.value === tab.value);
      const isSelected = tab.value === this.value;
      tab.setSelected(isSelected, panel?.id ?? '');
    });

    panels.forEach((panel) => {
      const tab = tabs.find((t) => t.value === panel.value);
      panel.active = panel.value === this.value;
      panel.setLabelledBy(tab?.id ?? '');
    });

    // Sync roving tabindex to selected tab
    const selectedIndex = tabs.findIndex((t) => t.value === this.value);
    if (selectedIndex !== -1) {
      this._roving.setCurrentIndex(selectedIndex);
    }
  }

  protected override render() {
    return html`
      <div class="tablist" role="tablist" aria-orientation=${this.orientation}>
        <slot name="tab" @slotchange=${this._syncTabs}></slot>
      </div>
      <slot @slotchange=${this._syncTabs}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tabs': BlTabs;
  }
}
