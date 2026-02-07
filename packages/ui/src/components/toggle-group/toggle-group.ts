import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { toggleGroupStyles } from './toggle-group.styles.js';
import { RovingTabindexController } from '../../controllers/roving-tabindex.js';
import type { BlToggle } from '../toggle/toggle.js';

export type ToggleGroupType = 'single' | 'multiple';

/**
 * Groups `bl-toggle` children into a single/multiple selection set.
 *
 * @element bl-toggle-group
 * @slot - `bl-toggle` elements.
 * @fires bl-change - Emitted when the selection changes.
 */
@customElement('bl-toggle-group')
export class BlToggleGroup extends LitElement {
  static override styles = [tokens, toggleGroupStyles];

  private _roving = new RovingTabindexController(this, {
    selector: 'bl-toggle:not([aria-disabled="true"])',
    orientation: 'horizontal',
  });

  /** Selection mode: 'single' or 'multiple'. */
  @property()
  type: ToggleGroupType = 'single';

  /** The currently selected value(s). For single: string. For multiple: comma-separated. */
  @property()
  value = '';

  /** Layout orientation. */
  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Size to propagate to children. */
  @property()
  size: 'sm' | 'md' | 'lg' = 'md';

  /** Variant to propagate to children. */
  @property()
  variant: 'default' | 'outline' = 'default';

  /** Whether the group is disabled. */
  @property({ type: Boolean })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.addEventListener('bl-change', this._handleToggleChange as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-change', this._handleToggleChange as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('disabled') || changed.has('size') || changed.has('variant')) {
      this._syncToggles();
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
    if (changed.has('orientation')) {
      this._roving = new RovingTabindexController(this, {
        selector: 'bl-toggle:not([aria-disabled="true"])',
        orientation: this.orientation,
      });
    }
  }

  private _getValues(): string[] {
    return this.value ? this.value.split(',').map((v) => v.trim()) : [];
  }

  private _handleToggleChange = (e: CustomEvent<{ pressed: boolean }>): void => {
    const toggle = e.target as BlToggle;
    if (!toggle.value) return;
    e.stopPropagation();

    const currentValues = this._getValues();

    if (this.type === 'single') {
      if (e.detail.pressed) {
        this.value = toggle.value;
      } else {
        this.value = '';
      }
    } else {
      if (e.detail.pressed) {
        currentValues.push(toggle.value);
        this.value = currentValues.join(',');
      } else {
        this.value = currentValues.filter((v) => v !== toggle.value).join(',');
      }
    }

    this._syncToggles();
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: this.value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _syncToggles(): void {
    const selectedValues = this._getValues();
    const toggles = this.querySelectorAll<BlToggle>('bl-toggle');

    toggles.forEach((toggle) => {
      toggle.pressed = toggle.value ? selectedValues.includes(toggle.value) : false;
      toggle.size = this.size;
      toggle.variant = this.variant;
      if (this.disabled) toggle.disabled = true;
    });
  }

  protected override render() {
    return html`<slot @slotchange=${this._syncToggles}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-toggle-group': BlToggleGroup;
  }
}
