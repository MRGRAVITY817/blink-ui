import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableRowStyles } from './data-table.styles.js';

/**
 * A table row.
 *
 * @element bl-table-row
 * @slot - `bl-table-cell` or `bl-table-header-cell` elements.
 * @fires bl-row-click - Emitted when the row is clicked.
 */
@customElement('bl-table-row')
export class BlTableRow extends LitElement {
  static override styles = [tokens, tableRowStyles];

  /** Whether this row is selected. */
  @property({ type: Boolean, reflect: true })
  selected = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'row');
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('selected')) {
      this.setAttribute('aria-selected', String(this.selected));
    }
  }

  private _handleClick = (): void => {
    this.dispatchEvent(
      new CustomEvent('bl-row-click', {
        detail: { rowId: this.getAttribute('data-row-id') ?? '' },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-row': BlTableRow;
  }
}
