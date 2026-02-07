import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { breadcrumbStyles } from './page-header.styles.js';

/**
 * Breadcrumb navigation following WAI-ARIA Breadcrumb pattern.
 * Visual separators via CSS `::before` (not in DOM).
 *
 * @element bl-breadcrumb
 * @slot - `bl-breadcrumb-item` elements.
 */
@customElement('bl-breadcrumb')
export class BlBreadcrumb extends LitElement {
  static override styles = [tokens, breadcrumbStyles];

  /** Accessible label for the navigation. */
  @property()
  label = 'Breadcrumb';

  private _handleSlotChange(): void {
    const items = this.querySelectorAll('bl-breadcrumb-item');
    // Mark the last item as current
    items.forEach((item, i) => {
      if (i === items.length - 1) {
        item.setAttribute('current', '');
      } else {
        item.removeAttribute('current');
      }
    });
  }

  protected override render() {
    return html`
      <nav aria-label=${this.label}>
        <ol part="list">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-breadcrumb': BlBreadcrumb;
  }
}
