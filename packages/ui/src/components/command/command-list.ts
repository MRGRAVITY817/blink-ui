import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandListStyles } from './command.styles.js';

/**
 * Scrollable results area for the command palette.
 *
 * @element bl-command-list
 * @slot - Command groups and items.
 */
@customElement('bl-command-list')
export class BlCommandList extends LitElement {
  static override styles = [tokens, commandListStyles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'listbox');
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-list': BlCommandList;
  }
}
