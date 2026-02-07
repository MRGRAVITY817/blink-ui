import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableHeaderCellStyles } from './data-table.styles.js';

export type SortDirection = 'ascending' | 'descending' | 'none';

/**
 * A table header cell with optional sorting.
 *
 * @element bl-table-header-cell
 * @slot - Header label text.
 */
@customElement('bl-table-header-cell')
export class BlTableHeaderCell extends LitElement {
  static override styles = [tokens, tableHeaderCellStyles];

  /** Column identifier for sorting. */
  @property()
  column = '';

  /** Whether this column is sortable. */
  @property({ type: Boolean, reflect: true })
  sortable = false;

  /** Current sort direction. */
  @property({ reflect: true, attribute: 'sort-direction' })
  sortDirection: SortDirection = 'none';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
    if (this.sortable) {
      this.addEventListener('click', this._handleClick);
      this.setAttribute('tabindex', '-1');
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('sortDirection')) {
      if (this.sortDirection !== 'none') {
        this.setAttribute('aria-sort', this.sortDirection);
      } else {
        this.removeAttribute('aria-sort');
      }
    }
  }

  private _handleClick = (): void => {
    if (!this.sortable) return;
    const next: SortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
    this.sortDirection = next;
    this.dispatchEvent(
      new CustomEvent('bl-header-sort', {
        detail: { column: this.column, direction: next },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <div class="header-cell" part="header-cell">
        <slot></slot>
        ${this.sortable
          ? html`
              <svg
                class="sort-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 4 18 9"></polyline>
              </svg>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-header-cell': BlTableHeaderCell;
  }
}
