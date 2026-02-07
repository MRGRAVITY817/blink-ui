import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';

/**
 * A label for a menu group. Renders as a non-interactive heading.
 *
 * @element bl-menu-group-label
 * @slot - Label text.
 */
@customElement('bl-menu-group-label')
export class BlMenuGroupLabel extends LitElement {
  static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--bl-spacing-sm) var(--bl-spacing-sm) var(--bl-spacing-xs);
        font-family: var(--bl-font-family-base);
        font-size: var(--bl-font-size-xs);
        font-weight: 600;
        color: var(--bl-color-neutral-500);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        user-select: none;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-menu-group-label': BlMenuGroupLabel;
  }
}
