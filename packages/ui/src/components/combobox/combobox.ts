import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { comboboxStyles } from './combobox.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import { FilterController } from '../../controllers/filter.js';
import type { BlComboboxItem } from './combobox-item.js';

export type ComboboxSize = 'sm' | 'md' | 'lg';
export type ComboboxFilter = 'includes' | 'startsWith' | 'none';

/**
 * An autocomplete combobox with input + dropdown listbox.
 *
 * @element bl-combobox
 * @slot - `bl-combobox-item` and `bl-combobox-group` elements.
 * @fires bl-change - Emitted when a value is selected.
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

  /** The selected value. */
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

  @state()
  private _visible = false;

  @state()
  private _inputText = '';

  @state()
  private _visibleCount = 0;

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
  }

  private _getItems(): BlComboboxItem[] {
    return Array.from(this.querySelectorAll<BlComboboxItem>('bl-combobox-item'));
  }

  private _getVisibleItems(): BlComboboxItem[] {
    return this._getItems().filter((item) => !item.hidden && !item.disabled);
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
    if (visible.length > 0) this._highlightIndex(0);
    else this._highlightedIndex = -1;
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

  private async _openListbox(): Promise<void> {
    if (this._visible) return;
    this._visible = true;

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

    // Highlight first visible item
    const visible = this._getVisibleItems();
    const selectedIdx = visible.findIndex((i) => i.value === this.value);
    this._highlightIndex(selectedIdx >= 0 ? selectedIdx : 0);
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

  protected override render() {
    const showEmpty = this._visible && this._visibleCount === 0 && this._inputText.length > 0;

    return html`
      <div
        class="input-wrapper"
        part="input-wrapper"
        @click=${this._handleTriggerClick}
      >
        <input
          id=${this._inputId}
          part="input"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${this._visible ? this._listboxId : nothing}
          .value=${this._inputText}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
        />
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

      ${this._visible
        ? html`
            <div class="listbox" id=${this._listboxId} role="listbox">
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
