import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tabPanelStyles } from './tab-panel.styles.js';

/**
 * A panel of content associated with a `bl-tab`.
 *
 * @element bl-tab-panel
 * @slot - Panel content.
 * @csspart panel - The panel container.
 */
@customElement('bl-tab-panel')
export class BlTabPanel extends LitElement {
  static override styles = [tokens, tabPanelStyles];

  /** The value linking this panel to its tab. */
  @property()
  value = '';

  /** Whether this panel is currently active (visible). Managed by bl-tabs. */
  @property({ type: Boolean, reflect: true })
  active = false;

  private _panelId = `bl-tab-panel-${Math.random().toString(36).slice(2, 9)}`;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
    this.id = this.id || this._panelId;
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  /** Called by parent tabs to link to its tab. */
  setLabelledBy(tabId: string): void {
    if (tabId) {
      this.setAttribute('aria-labelledby', tabId);
    }
  }

  protected override render() {
    return html`
      <div class="panel" part="panel">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-panel': BlTabPanel;
  }
}
