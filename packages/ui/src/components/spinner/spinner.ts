import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { spinnerStyles } from './spinner.styles.js';

export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * A loading spinner with screen reader announcement.
 *
 * @element bl-spinner
 * @csspart spinner - The spinning element.
 */
@customElement('bl-spinner')
export class BlSpinner extends LitElement {
  static override styles = [tokens, spinnerStyles];

  /** Size of the spinner. */
  @property({ reflect: true })
  size: SpinnerSize = 'md';

  /** Screen reader label. Default: 'Loading' */
  @property()
  label = 'Loading';

  protected override render() {
    return html`
      <div part="spinner" class="spinner" role="status">
        <span class="sr-only">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-spinner': BlSpinner;
  }
}
