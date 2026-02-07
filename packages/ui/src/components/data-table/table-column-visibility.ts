import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableColumnVisibilityStyles } from './data-table.styles.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';

export interface ColumnVisibilityItem {
  id: string;
  label: string;
  visible: boolean;
}

/**
 * Dropdown checklist for toggling column visibility.
 *
 * @element bl-table-column-visibility
 * @fires bl-column-visibility-change - Emitted when column visibility changes.
 */
@customElement('bl-table-column-visibility')
export class BlTableColumnVisibility extends LitElement {
  static override styles = [tokens, tableColumnVisibilityStyles];

  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { this._open = false; },
  });

  /** Column items to display in the checklist. */
  @property({ attribute: false })
  columns: ColumnVisibilityItem[] = [];

  /** Label for the trigger button. */
  @property()
  label = 'Columns';

  @state() private _open = false;

  private _toggle(): void {
    this._open = !this._open;
  }

  private _handleChange(columnId: string, visible: boolean): void {
    this.dispatchEvent(new CustomEvent('bl-column-visibility-change', {
      detail: { columnId, visible },
      composed: true,
      bubbles: true,
    }));
  }

  protected override render() {
    return html`
      <button class="trigger" @click=${this._toggle} aria-haspopup="true" aria-expanded=${this._open}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
        </svg>
        ${this.label}
      </button>
      ${this._open ? html`
        <div class="dropdown" role="menu">
          ${this.columns.map(col => html`
            <label class="dropdown-item" role="menuitemcheckbox" aria-checked=${col.visible}>
              <input
                type="checkbox"
                .checked=${col.visible}
                @change=${(e: Event) => {
                  this._handleChange(col.id, (e.target as HTMLInputElement).checked);
                }}
              />
              ${col.label}
            </label>
          `)}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-column-visibility': BlTableColumnVisibility;
  }
}
