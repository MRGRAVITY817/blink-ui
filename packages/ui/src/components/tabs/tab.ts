import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tabStyles } from './tab.styles.js';

/**
 * A single tab within a `bl-tabs` component.
 *
 * @element bl-tab
 * @slot - Tab label content.
 * @csspart tab - The tab button element.
 */
@customElement('bl-tab')
export class BlTab extends LitElement {
  static override styles = [tokens, tabStyles];

  /** The value linking this tab to its panel. */
  @property()
  value = '';

  /** Whether this tab is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  /** Called by parent tabs to update selection state. */
  setSelected(selected: boolean, panelId: string): void {
    this.setAttribute('aria-selected', String(selected));
    if (panelId) {
      this.setAttribute('aria-controls', panelId);
    }
  }

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-tab-select', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <button
        class="tab"
        part="tab"
        tabindex="-1"
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab': BlTab;
  }
}
