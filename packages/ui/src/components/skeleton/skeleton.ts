import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { skeletonStyles } from './skeleton.styles.js';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

/**
 * A placeholder loading state with animated pulse.
 *
 * @element bl-skeleton
 * @csspart skeleton - The skeleton element.
 */
@customElement('bl-skeleton')
export class BlSkeleton extends LitElement {
  static override styles = [tokens, skeletonStyles];

  /** Width of the skeleton. */
  @property()
  width = '';

  /** Height of the skeleton. */
  @property()
  height = '';

  /** Shape variant. */
  @property({ reflect: true })
  variant: SkeletonVariant = 'rect';

  /** Shorthand for circle width and height. */
  @property()
  size = '';

  protected override render() {
    const w = this.variant === 'circle' && this.size ? this.size : this.width || '100%';
    const h =
      this.variant === 'circle' && this.size
        ? this.size
        : this.height || (this.variant === 'text' ? '1em' : '100%');

    return html`
      <div
        part="skeleton"
        class="skeleton"
        style="width:${w};height:${h}"
        aria-hidden="true"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-skeleton': BlSkeleton;
  }
}
