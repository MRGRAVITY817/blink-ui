import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { optionGroupStyles } from './option-group.styles.js';

/**
 * A labelled group of options within a `bl-select`.
 *
 * @element bl-option-group
 * @slot - `bl-option` elements.
 */
@customElement('bl-option-group')
export class BlOptionGroup extends LitElement {
  static override styles = [tokens, optionGroupStyles];

  /** The group label. */
  @property()
  label = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  protected override render() {
    return html`
      <div class="group-label" aria-hidden="true">${this.label}</div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-option-group': BlOptionGroup;
  }
}
