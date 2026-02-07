import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandInputStyles } from './command.styles.js';

/**
 * Search input for the command palette.
 *
 * @element bl-command-input
 */
@customElement('bl-command-input')
export class BlCommandInput extends LitElement {
  static override styles = [tokens, commandInputStyles];

  /** Placeholder text. */
  @property()
  placeholder = 'Type a command or search...';

  private _handleInput = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('bl-command-input-change', {
        detail: { value },
        composed: true,
        bubbles: true,
      }),
    );
  };

  protected override render() {
    return html`
      <div class="input-wrapper">
        <svg
          class="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          part="input"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="true"
          placeholder=${this.placeholder}
          @input=${this._handleInput}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-input': BlCommandInput;
  }
}
