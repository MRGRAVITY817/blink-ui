import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { selectStyles } from './select.styles.js';
import { OverlayController } from '../../controllers/overlay.js';
import { AnimationController } from '../../controllers/animation.js';
import { ClickOutsideController } from '../../controllers/click-outside.js';
import { TypeaheadController } from '../../controllers/typeahead.js';
import type { BlOption } from './option.js';
import type { Placement } from '@floating-ui/dom';

export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * A select dropdown with virtual focus (aria-activedescendant).
 *
 * @element bl-select
 * @slot - `bl-option` and `bl-option-group` elements.
 * @fires bl-change - Emitted when the selected value changes.
 */
@customElement('bl-select')
export class BlSelect extends LitElement {
  static override styles = [tokens, selectStyles];

  private _overlay = new OverlayController(this, { matchWidth: true });
  private _animation = new AnimationController(this, { enterDuration: 150, exitDuration: 100 });
  private _clickOutside = new ClickOutsideController(this, {
    onClickOutside: () => { if (this.open) this._close(); },
    active: false,
  });
  private _typeahead = new TypeaheadController(this, {
    selector: 'bl-option:not([aria-disabled="true"])',
    onMatch: (_item, index) => this._highlightIndex(index),
  });

  private _listboxId = `bl-select-lb-${Math.random().toString(36).slice(2, 9)}`;
  private _highlightedIndex = -1;

  /** The selected value. */
  @property()
  value = '';

  /** Form name for hidden select. */
  @property()
  name = '';

  /** Placeholder text when no value is selected. */
  @property()
  placeholder = 'Select an option';

  /** Whether the select is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether the select is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Size variant. */
  @property({ reflect: true })
  size: SelectSize = 'md';

  /** Preferred placement. */
  @property()
  placement: Placement = 'bottom-start';

  @state()
  private _visible = false;

  @state()
  private _displayText = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('bl-option-select', this._handleOptionSelect as EventListener);
    this.addEventListener('bl-option-highlight', this._handleOptionHighlight as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('bl-option-select', this._handleOptionSelect as EventListener);
    this.removeEventListener('bl-option-highlight', this._handleOptionHighlight as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this._openListbox();
      } else if (this._visible) {
        this._closeListbox();
      }
    }
    if (changed.has('value')) {
      this._syncSelection();
    }
  }

  private _getOptions(): BlOption[] {
    return Array.from(this.querySelectorAll<BlOption>('bl-option'));
  }

  private _syncSelection(): void {
    const options = this._getOptions();
    options.forEach((opt) => opt.setSelected(opt.value === this.value));
    const selected = options.find((opt) => opt.value === this.value);
    this._displayText = selected?.getLabel() ?? '';
  }

  private _handleTriggerClick = (): void => {
    if (this.disabled) return;
    if (this.open) {
      this._close();
    } else {
      this.open = true;
    }
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (!this.open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.open = true;
        return;
      }
    }

    const options = this._getOptions().filter((o) => !o.disabled);
    if (options.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._highlightIndex(
        this._highlightedIndex + 1 >= options.length ? 0 : this._highlightedIndex + 1,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._highlightIndex(
        this._highlightedIndex - 1 < 0 ? options.length - 1 : this._highlightedIndex - 1,
      );
    } else if (e.key === 'Home') {
      e.preventDefault();
      this._highlightIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this._highlightIndex(options.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._highlightedIndex >= 0 && this._highlightedIndex < options.length) {
        this._selectOption(options[this._highlightedIndex]!.value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._close();
    } else if (e.key === 'Tab') {
      this._close();
    }
  };

  private _highlightIndex(index: number): void {
    const options = this._getOptions().filter((o) => !o.disabled);
    options.forEach((opt) => opt.setHighlighted(false));

    if (index >= 0 && index < options.length) {
      this._highlightedIndex = index;
      options[index]!.setHighlighted(true);
      // Virtual focus: update aria-activedescendant
      const trigger = this.shadowRoot!.querySelector<HTMLElement>('.trigger');
      trigger?.setAttribute('aria-activedescendant', options[index]!.id);
      options[index]!.scrollIntoView({ block: 'nearest' });
    }
  }

  private _handleOptionSelect = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    this._selectOption(e.detail.value);
  };

  private _handleOptionHighlight = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    const options = this._getOptions().filter((o) => !o.disabled);
    const idx = options.findIndex((opt) => opt.value === e.detail.value);
    if (idx !== -1) this._highlightIndex(idx);
  };

  private _selectOption(value: string): void {
    this.value = value;
    this._syncSelection();
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
    await this.updateComplete;

    const trigger = this.shadowRoot!.querySelector<HTMLElement>('.trigger');
    const listbox = this.shadowRoot!.querySelector<HTMLElement>('.listbox');
    if (!trigger || !listbox) return;

    this._overlay.setPlacement(this.placement);
    this._overlay.show(trigger, listbox);
    this._animation.enter(listbox);
    this._clickOutside.active = true;

    // Highlight selected option
    const options = this._getOptions().filter((o) => !o.disabled);
    const selectedIdx = options.findIndex((opt) => opt.value === this.value);
    this._highlightIndex(selectedIdx >= 0 ? selectedIdx : 0);
  }

  private async _closeListbox(): Promise<void> {
    if (!this._visible) return;

    const listbox = this.shadowRoot!.querySelector<HTMLElement>('.listbox');
    if (listbox) {
      await this._animation.exit(listbox);
    }

    this._overlay.hide();
    this._clickOutside.active = false;
    this._visible = false;
    this._highlightedIndex = -1;

    const trigger = this.shadowRoot!.querySelector<HTMLElement>('.trigger');
    trigger?.removeAttribute('aria-activedescendant');
    trigger?.focus();
  }

  private _close(): void {
    this.open = false;
  }

  protected override render() {
    const hasValue = this._displayText !== '';

    return html`
      <button
        class="trigger"
        part="trigger"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${this._visible ? this._listboxId : nothing}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._handleTriggerClick}
      >
        <span class="trigger-text ${hasValue ? '' : 'placeholder'}">
          ${hasValue ? this._displayText : this.placeholder}
        </span>
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
      </button>

      ${this._visible
        ? html`
            <div
              class="listbox"
              id=${this._listboxId}
              role="listbox"
            >
              <slot @slotchange=${this._syncSelection}></slot>
            </div>
          `
        : nothing}

      ${this.name
        ? html`<select class="native-select" tabindex="-1" aria-hidden="true" .value=${this.value}>
            <option value=${this.value}>${this._displayText}</option>
          </select>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
  }
}
