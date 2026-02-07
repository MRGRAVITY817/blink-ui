import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxStyles } from './combobox.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import { FilterController } from '../../controllers/filter.js';
import type { BlComboboxItem } from './combobox-item.js';
import type { ComboboxChipItem } from './combobox-chips.js';

export type ComboboxSize = 'sm' | 'md' | 'lg';
export type ComboboxFilter = 'includes' | 'startsWith' | 'none';

/**
 * An autocomplete combobox with input + dropdown listbox.
 * Supports single-select and multi-select modes.
 *
 * @element bl-combobox
 * @slot - `bl-combobox-item` and `bl-combobox-group` elements.
 * @fires bl-change - Emitted when a value is selected. Detail: `{ value: string }` in single mode, `{ value: string[] }` in multiple mode.
 * @fires bl-input - Emitted when the input text changes.
 */
@customElement('bl-combobox')
export class BlCombobox extends LitElement {
  static override styles = [tokens, comboboxStyles];

  private _overlay = new OverlayController(this, { matchWidth: true });
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { if (this.open) this._close(); },
    active: false,
  });
  private _filter = new FilterController(this, {
    selector: 'bl-combobox-item:not([disabled])',
  });

  private _listboxId = `bl-cb-lb-${Math.random().toString(36).slice(2, 9)}`;
  private _inputId = `bl-cb-in-${Math.random().toString(36).slice(2, 9)}`;
  private _highlightedIndex = -1;

  /** The selected value (single-select mode). */
  @property()
  value = '';

  /** Placeholder text. */
  @property()
  placeholder = '';

  /** Whether the combobox is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether the combobox is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Size variant. */
  @property({ reflect: true })
  size: ComboboxSize = 'md';

  /** Filter mode. Use 'none' for external filtering. */
  @property()
  filter: ComboboxFilter = 'includes';

  /** Enable multi-select mode. When true, maintains an array of selected values. */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /** Show clear button to reset selection. */
  @property({ type: Boolean, attribute: 'show-clear' })
  showClear = false;

  /** Auto-highlight the first filtered item when the list opens or filter changes. */
  @property({ type: Boolean, attribute: 'auto-highlight' })
  autoHighlight = false;

  @state()
  private _visible = false;

  @state()
  private _inputText = '';

  @state()
  private _visibleCount = 0;

  /** Selected values in multi-select mode. */
  @state()
  private _selectedValues: string[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('bl-combobox-item-select', this._handleItemSelect as EventListener);
    this.addEventListener('bl-combobox-item-highlight', this._handleItemHighlight as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('bl-combobox-item-select', this._handleItemSelect as EventListener);
    this.removeEventListener('bl-combobox-item-highlight', this._handleItemHighlight as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._openListbox();
      else if (this._visible) this._closeListbox();
    }
    if (changed.has('filter')) {
      this._filter.setMode(this.filter === 'none' ? undefined : this.filter);
    }
    if (changed.has('multiple')) {
      this._syncMultiselectAttribute();
    }
    if (changed.has('value') && !this.multiple) {
      this._getItems().forEach((i) => i.setSelected(i.value === this.value));
    }
  }

  override firstUpdated(): void {
    this._syncMultiselectAttribute();
    if (this.multiple && this._selectedValues.length > 0) {
      this._syncItemSelections();
    }
  }

  /** Get the selected values array (useful in multi-select mode). */
  getSelectedValues(): string[] {
    if (this.multiple) return [...this._selectedValues];
    return this.value ? [this.value] : [];
  }

  /** Set the selected values programmatically (multi-select mode). */
  setSelectedValues(values: string[]): void {
    if (!this.multiple) return;
    this._selectedValues = [...values];
    this._syncItemSelections();
    this.requestUpdate();
  }

  private _getItems(): BlComboboxItem[] {
    return Array.from(this.querySelectorAll<BlComboboxItem>('bl-combobox-item'));
  }

  private _getVisibleItems(): BlComboboxItem[] {
    return this._getItems().filter((item) => !item.hidden && !item.disabled);
  }

  private _syncMultiselectAttribute(): void {
    this._getItems().forEach((item) => item.setMultiselect(this.multiple));
  }

  private _syncItemSelections(): void {
    this._getItems().forEach((i) => {
      i.setSelected(this._selectedValues.includes(i.value));
      i.setMultiselect(this.multiple);
    });
  }

  private _getChipItems(): ComboboxChipItem[] {
    const items = this._getItems();
    return this._selectedValues
      .map((value) => {
        const item = items.find((i) => i.value === value);
        return item ? { value, label: item.getLabel() } : { value, label: value };
      });
  }

  private _handleInput = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    this._inputText = input.value;

    if (!this.open) this.open = true;

    if (this.filter !== 'none') {
      this._visibleCount = this._filter.filter(input.value);
    }

    this.dispatchEvent(
      new CustomEvent('bl-input', {
        detail: { value: input.value },
        composed: true,
        bubbles: true,
      }),
    );

    // Reset highlight
    const visible = this._getVisibleItems();
    if (visible.length > 0 && this.autoHighlight) {
      this._highlightIndex(0);
    } else if (visible.length > 0) {
      this._highlightIndex(0);
    } else {
      this._highlightedIndex = -1;
    }
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (!this.open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.open = true;
        return;
      }
    }

    const items = this._getVisibleItems();
    if (items.length === 0 && e.key !== 'Escape') return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._highlightIndex(
          this._highlightedIndex + 1 >= items.length ? 0 : this._highlightedIndex + 1,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._highlightIndex(
          this._highlightedIndex - 1 < 0 ? items.length - 1 : this._highlightedIndex - 1,
        );
        break;
      case 'Home':
        e.preventDefault();
        this._highlightIndex(0);
        break;
      case 'End':
        e.preventDefault();
        this._highlightIndex(items.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._highlightedIndex >= 0 && this._highlightedIndex < items.length) {
          this._selectItem(items[this._highlightedIndex]!);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._close();
        break;
      case 'Backspace':
        if (this.multiple && this._inputText === '' && this._selectedValues.length > 0) {
          // Remove the last selected chip
          const lastValue = this._selectedValues[this._selectedValues.length - 1]!;
          this._removeSelectedValue(lastValue);
        }
        break;
      case 'Tab':
        this._close();
        break;
    }
  };

  private _highlightIndex(index: number): void {
    const items = this._getVisibleItems();
    items.forEach((item) => item.setHighlighted(false));

    if (index >= 0 && index < items.length) {
      this._highlightedIndex = index;
      items[index]!.setHighlighted(true);
      const input = this.shadowRoot!.querySelector<HTMLInputElement>('input');
      input?.setAttribute('aria-activedescendant', items[index]!.id);
      items[index]!.scrollIntoView({ block: 'nearest' });
    }
  }

  private _handleItemSelect = (e: CustomEvent<{ value: string; label: string }>): void => {
    e.stopPropagation();
    const item = this._getItems().find((i) => i.value === e.detail.value);
    if (item) this._selectItem(item);
  };

  private _handleItemHighlight = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    const items = this._getVisibleItems();
    const idx = items.findIndex((item) => item.value === e.detail.value);
    if (idx !== -1) this._highlightIndex(idx);
  };

  private _selectItem(item: BlComboboxItem): void {
    if (this.multiple) {
      this._toggleSelectedValue(item);
    } else {
      this.value = item.value;
      this._inputText = item.getLabel();

      // Mark selected
      this._getItems().forEach((i) => i.setSelected(i.value === this.value));

      this._close();
      this.dispatchEvent(
        new CustomEvent('bl-change', {
          detail: { value: this.value },
          composed: true,
          bubbles: true,
        }),
      );
    }
  }

  private _toggleSelectedValue(item: BlComboboxItem): void {
    const value = item.value;
    const idx = this._selectedValues.indexOf(value);

    if (idx === -1) {
      this._selectedValues = [...this._selectedValues, value];
    } else {
      this._selectedValues = this._selectedValues.filter((v) => v !== value);
    }

    this._syncItemSelections();
    this._inputText = '';

    // Re-focus input after selection in multi-mode
    requestAnimationFrame(() => {
      this.shadowRoot!.querySelector<HTMLInputElement>('input')?.focus();
    });

    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: [...this._selectedValues] },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _removeSelectedValue(value: string): void {
    this._selectedValues = this._selectedValues.filter((v) => v !== value);
    this._syncItemSelections();

    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: [...this._selectedValues] },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleChipRemove = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this._removeSelectedValue(e.detail.value);
    // Re-focus input
    requestAnimationFrame(() => {
      this.shadowRoot!.querySelector<HTMLInputElement>('input')?.focus();
    });
  };

  private _handleClear = (e: Event): void => {
    e.stopPropagation();

    if (this.multiple) {
      this._selectedValues = [];
      this._syncItemSelections();
      this._inputText = '';
      this.dispatchEvent(
        new CustomEvent('bl-change', {
          detail: { value: [] },
          composed: true,
          bubbles: true,
        }),
      );
    } else {
      this.value = '';
      this._inputText = '';
      this._getItems().forEach((i) => i.setSelected(false));
      this.dispatchEvent(
        new CustomEvent('bl-change', {
          detail: { value: '' },
          composed: true,
          bubbles: true,
        }),
      );
    }

    // Re-focus input
    requestAnimationFrame(() => {
      this.shadowRoot!.querySelector<HTMLInputElement>('input')?.focus();
    });
  };

  private async _openListbox(): Promise<void> {
    if (this._visible) return;
    this._visible = true;

    // Ensure multiselect attributes are synced when opening
    if (this.multiple) {
      this._syncItemSelections();
    }

    if (this.filter !== 'none') {
      this._visibleCount = this._filter.filter(this._inputText);
    } else {
      this._visibleCount = this._getVisibleItems().length;
    }

    await this.updateComplete;

    const wrapper = this.shadowRoot!.querySelector<HTMLElement>('.input-wrapper');
    const listbox = this.shadowRoot!.querySelector<HTMLElement>('.listbox');
    if (!wrapper || !listbox) return;

    this._overlay.show(wrapper, listbox);
    this._animation.enter(listbox);
    this._clickOutside.active = true;

    // Highlight first visible item or selected item
    const visible = this._getVisibleItems();
    if (this.multiple) {
      if (this.autoHighlight && visible.length > 0) {
        this._highlightIndex(0);
      }
    } else {
      const selectedIdx = visible.findIndex((i) => i.value === this.value);
      this._highlightIndex(selectedIdx >= 0 ? selectedIdx : (this.autoHighlight ? 0 : -1));
      // Fallback: always highlight first if nothing selected
      if (selectedIdx < 0 && visible.length > 0) {
        this._highlightIndex(0);
      }
    }
  }

  private async _closeListbox(): Promise<void> {
    if (!this._visible) return;

    const listbox = this.shadowRoot!.querySelector<HTMLElement>('.listbox');
    if (listbox) await this._animation.exit(listbox);

    this._overlay.hide();
    this._clickOutside.active = false;
    this._visible = false;
    this._highlightedIndex = -1;

    const input = this.shadowRoot!.querySelector<HTMLInputElement>('input');
    input?.removeAttribute('aria-activedescendant');
  }

  private _close(): void {
    this.open = false;
  }

  private _handleTriggerClick = (): void => {
    if (this.disabled) return;
    if (!this.open) {
      this.open = true;
      requestAnimationFrame(() => {
        this.shadowRoot!.querySelector<HTMLInputElement>('input')?.focus();
      });
    }
  };

  /** Whether the clear button should be visible. */
  private get _showClearButton(): boolean {
    if (!this.showClear) return false;
    if (this.multiple) return this._selectedValues.length > 0;
    return this.value !== '' || this._inputText !== '';
  }

  protected override render() {
    const showEmpty = this._visible && this._visibleCount === 0 && this._inputText.length > 0;
    const chipItems = this.multiple ? this._getChipItems() : [];
    const placeholderText = this.multiple && this._selectedValues.length > 0
      ? ''
      : this.placeholder;

    return html`
      <div
        class="input-wrapper"
        part="input-wrapper"
        @click=${this._handleTriggerClick}
      >
        ${this.multiple && chipItems.length > 0
          ? html`
              <bl-combobox-chips
                .items=${chipItems}
                ?disabled=${this.disabled}
                @bl-chip-remove=${this._handleChipRemove}
              ></bl-combobox-chips>
            `
          : nothing}
        <div class="${this.multiple ? 'input-row' : ''}" style="${this.multiple ? '' : 'display: contents'}">
          <input
            id=${this._inputId}
            part="input"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls=${this._visible ? this._listboxId : nothing}
            aria-multiselectable=${this.multiple ? 'true' : nothing}
            .value=${this._inputText}
            placeholder=${placeholderText || nothing}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
          />
          ${this._showClearButton
            ? html`
                <button
                  class="clear-button"
                  part="clear-button"
                  type="button"
                  tabindex="-1"
                  aria-label="Clear selection"
                  @click=${this._handleClear}
                  @mousedown=${(e: Event) => e.preventDefault()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <span class="icon-separator" aria-hidden="true"></span>
              `
            : nothing}
          <svg
            class="trigger-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      ${this._visible
        ? html`
            <div class="listbox" id=${this._listboxId} role="listbox" aria-multiselectable=${this.multiple ? 'true' : nothing}>
              <slot></slot>
              ${showEmpty ? html`<slot name="empty"><div style="padding: 1rem; text-align: center; color: var(--bl-color-neutral-500); font-size: var(--bl-font-size-sm);">No results found</div></slot>` : nothing}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-combobox': BlCombobox;
  }
}
