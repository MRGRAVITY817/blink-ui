import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { breadcrumbItemStyles } from './page-header.styles.js';

/**
 * A breadcrumb item. The last item automatically gets `aria-current="page"`.
 *
 * @element bl-breadcrumb-item
 * @slot - Link or text content.
 */
@customElement('bl-breadcrumb-item')
export class BlBreadcrumbItem extends LitElement {
  static override styles = [tokens, breadcrumbItemStyles];

  /** Whether this is the current page. Set automatically by bl-breadcrumb. */
  @property({ type: Boolean, reflect: true })
  current = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('current')) {
      if (this.current) {
        this.setAttribute('aria-current', 'page');
      } else {
        this.removeAttribute('aria-current');
      }
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-breadcrumb-item': BlBreadcrumbItem;
  }
}
