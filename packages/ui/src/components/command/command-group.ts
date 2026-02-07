import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandGroupStyles } from './command.styles.js';

/**
 * Named group within a command palette.
 *
 * @element bl-command-group
 * @slot - `bl-command-item` elements.
 */
@customElement('bl-command-group')
export class BlCommandGroup extends LitElement {
  static override styles = [tokens, commandGroupStyles];

  /** Group heading text. */
  @property()
  heading = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('heading') && this.heading) {
      this.setAttribute('aria-label', this.heading);
    }
  }

  protected override render() {
    return html`
      ${this.heading ? html`<div class="label" part="label">${this.heading}</div>` : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-group': BlCommandGroup;
  }
}
