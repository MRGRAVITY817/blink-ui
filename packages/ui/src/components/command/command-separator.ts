import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandSeparatorStyles } from './command.styles.js';

/**
 * Visual divider within a command palette.
 *
 * @element bl-command-separator
 */
@customElement('bl-command-separator')
export class BlCommandSeparator extends LitElement {
  static override styles = [tokens, commandSeparatorStyles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-separator': BlCommandSeparator;
  }
}
