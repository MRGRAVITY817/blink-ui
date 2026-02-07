import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';

/**
 * A labelled group of menu items.
 *
 * @element bl-menu-group
 * @slot - `bl-menu-item` elements.
 */
@customElement('bl-menu-group')
export class BlMenuGroup extends LitElement {
  static override styles = [
    tokens,
    css`
      :host {
        display: block;
      }
    `,
  ];

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
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-menu-group': BlMenuGroup;
  }
}
