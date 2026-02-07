import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableToolbarStyles } from './data-table.styles.js';

/**
 * Toolbar for data table with search input and action slots.
 *
 * @element bl-table-toolbar
 * @slot - Default slot for filter controls (e.g., faceted filters).
 * @slot end - Slot for end-aligned controls (e.g., column visibility toggle).
 * @fires bl-toolbar-search - Emitted when search input changes.
 */
@customElement('bl-table-toolbar')
export class BlTableToolbar extends LitElement {
  static override styles = [tokens, tableToolbarStyles];

  /** Placeholder text for the search input. */
  @property()
  placeholder = 'Filter...';

  /** Current search value. */
  @property()
  value = '';

  /** Hide the search input. */
  @property({ type: Boolean, attribute: 'no-search' })
  noSearch = false;

  private _handleInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    this.dispatchEvent(new CustomEvent('bl-toolbar-search', {
      detail: { value },
      composed: true,
      bubbles: true,
    }));
  }

  protected override render() {
    return html`
      <div class="toolbar" part="base">
        <div class="toolbar-start">
          ${!this.noSearch ? html`
            <input
              class="search-input"
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder}
              @input=${this._handleInput}
              part="search"
            />
          ` : nothing}
          <slot></slot>
        </div>
        <div class="toolbar-end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-toolbar': BlTableToolbar;
  }
}
