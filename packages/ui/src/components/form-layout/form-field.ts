import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { formFieldStyles } from './form-layout.styles.js';

/**
 * Wraps one control + label + description + error.
 * Discovers its slotted control via `@slotchange` and sets
 * `aria-describedby` pointing to description/error IDs.
 *
 * @element bl-form-field
 * @slot - The form control element.
 * @slot label - The label element.
 * @slot description - Help text.
 * @slot error - Error message.
 */
@customElement('bl-form-field')
export class BlFormField extends LitElement {
  static override styles = [tokens, formFieldStyles];

  private _fieldId = `bl-ff-${Math.random().toString(36).slice(2, 9)}`;
  private _descId = `${this._fieldId}-desc`;
  private _errorId = `${this._fieldId}-err`;

  /** Layout direction (inherited from parent bl-form-layout, or set directly). */
  @property({ reflect: true })
  layout: 'vertical' | 'horizontal' = 'vertical';

  /** Whether the field is required. Shows a visual indicator. */
  @property({ type: Boolean })
  required = false;

  override connectedCallback(): void {
    super.connectedCallback();
    // Inherit layout from parent bl-form-layout
    const parent = this.closest('bl-form-layout');
    if (parent) {
      const parentLayout = parent.getAttribute('layout');
      if (parentLayout === 'horizontal') this.layout = 'horizontal';
    }
  }

  private _handleControlSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedElements({ flatten: true });
    for (const node of nodes) {
      if (node instanceof HTMLElement) {
        this._linkAria(node);
      }
    }
  }

  private _linkAria(control: HTMLElement): void {
    const describedBy: string[] = [];

    // Check if description slot has content
    const descSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="description"]');
    if (descSlot && descSlot.assignedElements().length > 0) {
      const descEl = descSlot.assignedElements()[0] as HTMLElement;
      descEl.id = descEl.id || this._descId;
      describedBy.push(descEl.id);
    }

    // Check if error slot has content
    const errSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="error"]');
    if (errSlot && errSlot.assignedElements().length > 0) {
      const errEl = errSlot.assignedElements()[0] as HTMLElement;
      errEl.id = errEl.id || this._errorId;
      describedBy.push(errEl.id);
      control.setAttribute('aria-invalid', 'true');
    } else {
      control.removeAttribute('aria-invalid');
    }

    if (describedBy.length > 0) {
      control.setAttribute('aria-describedby', describedBy.join(' '));
    } else {
      control.removeAttribute('aria-describedby');
    }
  }

  private _handleSupportSlotChange = (): void => {
    // Re-link aria when description/error slots change
    const controlSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    if (controlSlot) {
      const nodes = controlSlot.assignedElements({ flatten: true });
      for (const node of nodes) {
        if (node instanceof HTMLElement) this._linkAria(node);
      }
    }
  };

  protected override render() {
    return html`
      <div class="form-field" part="base">
        <div class="label-area">
          <slot name="label"></slot>
          ${this.required ? html`<span class="required-indicator" aria-hidden="true">*</span>` : ''}
        </div>
        <div class="control-area">
          <slot @slotchange=${this._handleControlSlotChange}></slot>
        </div>
        <div class="support-area">
          <slot name="description" @slotchange=${this._handleSupportSlotChange}></slot>
          <slot name="error" @slotchange=${this._handleSupportSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-form-field': BlFormField;
  }
}
