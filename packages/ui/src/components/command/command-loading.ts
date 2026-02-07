import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandLoadingStyles } from './command.styles.js';

/**
 * Loading indicator for the command palette during async operations.
 *
 * @element bl-command-loading
 * @slot - Custom loading content.
 */
@customElement('bl-command-loading')
export class BlCommandLoading extends LitElement {
  static override styles = [tokens, commandLoadingStyles];

  /** Progress value between 0 and 100. Leave unset for indeterminate. */
  @property({ type: Number })
  progress?: number;

  /** Label for the loading state. */
  @property()
  label = '';

  protected override render() {
    const isIndeterminate = this.progress == null;
    const width = isIndeterminate ? 40 : Math.max(0, Math.min(100, this.progress!));

    return html`
      <div class="loading" part="base">
        <slot>
          ${this.label ? html`<span>${this.label}</span>` : nothing}
        </slot>
      </div>
      <div class="progress-bar" role="progressbar"
        aria-valuenow=${isIndeterminate ? nothing : width}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="progress-fill ${isIndeterminate ? 'indeterminate' : ''}"
          style=${isIndeterminate ? '' : `width: ${width}%`}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-loading': BlCommandLoading;
  }
}
