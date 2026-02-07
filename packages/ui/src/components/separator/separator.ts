import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { separatorStyles } from './separator.styles.js';

export type SeparatorOrientation = 'horizontal' | 'vertical';

/**
 * A content divider for the Blink UI design system.
 *
 * @element bl-separator
 * @csspart separator - The separator element.
 */
@customElement('bl-separator')
export class BlSeparator extends LitElement {
  static override styles = [tokens, separatorStyles];

  /** Orientation of the separator. */
  @property({ reflect: true })
  orientation: SeparatorOrientation = 'horizontal';

  /** When true, the separator is purely decorative and omits the separator role. */
  @property({ type: Boolean, reflect: true })
  decorative = false;

  protected override render() {
    return html`
      <div
        part="separator"
        role=${this.decorative ? nothing : 'separator'}
        aria-orientation=${this.decorative ? nothing : this.orientation}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-separator': BlSeparator;
  }
}
