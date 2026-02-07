import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandShortcutStyles } from './command.styles.js';

/**
 * Keyboard shortcut display using `<kbd>` elements.
 *
 * @element bl-command-shortcut
 * @slot - Shortcut text, each key wrapped in a `<kbd>`.
 */
@customElement('bl-command-shortcut')
export class BlCommandShortcut extends LitElement {
  static override styles = [tokens, commandShortcutStyles];

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-shortcut': BlCommandShortcut;
  }
}
