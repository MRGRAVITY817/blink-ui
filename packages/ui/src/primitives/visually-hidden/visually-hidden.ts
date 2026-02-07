import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { visuallyHiddenStyles } from './visually-hidden.styles.js';

/**
 * Visually hidden but accessible to screen readers.
 *
 * @element bl-visually-hidden
 * @slot - Content that is visually hidden but read by screen readers.
 */
@customElement('bl-visually-hidden')
export class BlVisuallyHidden extends LitElement {
  static override styles = [visuallyHiddenStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-visually-hidden': BlVisuallyHidden;
  }
}
