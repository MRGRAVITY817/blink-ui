import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandEmptyStyles } from './command.styles.js';

/**
 * "No results" state for command palette.
 *
 * @element bl-command-empty
 * @slot - Custom empty state content.
 */
@customElement('bl-command-empty')
export class BlCommandEmpty extends LitElement {
  static override styles = [tokens, commandEmptyStyles];

  protected override render() {
    return html`<slot>No results found.</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-empty': BlCommandEmpty;
  }
}
