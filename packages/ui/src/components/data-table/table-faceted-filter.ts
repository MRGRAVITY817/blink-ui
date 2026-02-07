import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { tableFacetedFilterStyles } from './data-table.styles.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';

export interface FacetedFilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Notion/Linear-style faceted filter popover.
 *
 * @element bl-table-faceted-filter
 * @fires bl-faceted-filter-change - Emitted when selected values change.
 */
@customElement('bl-table-faceted-filter')
export class BlTableFacetedFilter extends LitElement {
  static override styles = [tokens, tableFacetedFilterStyles];

  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { this._open = false; },
  });

  /** Filter title displayed on the trigger button. */
  @property()
  title = 'Filter';

  /** Available filter options. */
  @property({ attribute: false })
  options: FacetedFilterOption[] = [];

  /** Currently selected values. */
  @property({ attribute: false })
  selected: string[] = [];

  @state() private _open = false;
  @state() private _search = '';

  private _toggle(): void {
    this._open = !this._open;
    if (this._open) this._search = '';
  }

  private _toggleValue(value: string): void {
    const newSelected = this.selected.includes(value)
      ? this.selected.filter(v => v !== value)
      : [...this.selected, value];
    this.selected = newSelected;
    this.dispatchEvent(new CustomEvent('bl-faceted-filter-change', {
      detail: { values: newSelected },
      composed: true,
      bubbles: true,
    }));
  }

  private _clear(): void {
    this.selected = [];
    this.dispatchEvent(new CustomEvent('bl-faceted-filter-change', {
      detail: { values: [] },
      composed: true,
      bubbles: true,
    }));
  }

  private get _filteredOptions(): FacetedFilterOption[] {
    if (!this._search) return this.options;
    const q = this._search.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  protected override render() {
    const hasSelection = this.selected.length > 0;

    return html`
      <button
        class="trigger ${hasSelection ? 'active' : ''}"
        @click=${this._toggle}
        aria-haspopup="true"
        aria-expanded=${this._open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
        ${this.title}
        ${hasSelection ? html`
          <span class="separator"></span>
          <span class="count-badge">${this.selected.length}</span>
        ` : nothing}
      </button>
      ${this._open ? html`
        <div class="dropdown">
          <div class="filter-search">
            <input
              type="text"
              placeholder=${this.title}
              .value=${this._search}
              @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; }}
            />
          </div>
          <div class="filter-list" role="listbox" aria-multiselectable="true">
            ${this._filteredOptions.map(opt => {
              const isChecked = this.selected.includes(opt.value);
              return html`
                <div
                  class="filter-option"
                  role="option"
                  aria-selected=${isChecked}
                  @click=${() => this._toggleValue(opt.value)}
                >
                  <span class="check ${isChecked ? 'checked' : ''}">
                    ${isChecked ? html`
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ` : nothing}
                  </span>
                  <span class="label">${opt.label}</span>
                  ${opt.count != null ? html`<span class="option-count">${opt.count}</span>` : nothing}
                </div>
              `;
            })}
          </div>
          ${hasSelection ? html`
            <div class="filter-footer">
              <button class="clear-button" @click=${this._clear}>Clear filters</button>
            </div>
          ` : nothing}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-table-faceted-filter': BlTableFacetedFilter;
  }
}
