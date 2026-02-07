import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';

/**
 * A visual separator between menu items.
 *
 * @element bl-menu-separator
 */
@customElement('bl-menu-separator')
export class BlMenuSeparator extends LitElement {
  static override styles = [
    tokens,
    css`
      :host {
        display: block;
        height: 1px;
        margin: var(--bl-spacing-xs) 0;
        background-color: var(--bl-color-neutral-200);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  protected override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-menu-separator': BlMenuSeparator;
  }
}
