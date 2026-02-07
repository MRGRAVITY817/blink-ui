import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { labelStyles } from './label.styles.js';

/**
 * A form label that associates with form controls via `for`/`id`.
 *
 * @element bl-label
 * @slot - Label text content.
 * @csspart label - The native `<label>` element.
 */
@customElement('bl-label')
export class BlLabel extends LitElement {
  static override styles = [tokens, labelStyles];

  /** ID of the associated form control. */
  @property()
  for = '';

  /** When true, shows a required indicator. */
  @property({ type: Boolean, reflect: true })
  required = false;

  private _handleClick(): void {
    if (!this.for) return;
    const root = this.getRootNode() as Document | ShadowRoot;
    const target = root.getElementById?.(this.for) ?? document.getElementById(this.for);
    target?.focus();
  }

  protected override render() {
    return html`
      <label part="label" @click=${this._handleClick}>
        <slot></slot>${this.required
          ? html`<span class="required-indicator" aria-hidden="true">*</span>`
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-label': BlLabel;
  }
}
