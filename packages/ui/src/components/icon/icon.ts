import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconStyles } from './icon.styles.js';

/**
 * SVG icon wrapper. Decorative by default (`aria-hidden="true"`),
 * or labelled with `aria-label` when the `label` prop is set.
 *
 * @element bl-icon
 * @slot - SVG element to display.
 */
@customElement('bl-icon')
export class BlIcon extends LitElement {
  static override styles = [iconStyles];

  /** Accessible label. If set, the icon gets `role="img"` and `aria-label`. */
  @property()
  label = '';

  protected override render() {
    const isLabelled = !!this.label;
    return html`
      <span
        part="icon"
        role=${isLabelled ? 'img' : nothing}
        aria-label=${isLabelled ? this.label : nothing}
        aria-hidden=${isLabelled ? nothing : 'true'}
      >
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-icon': BlIcon;
  }
}
