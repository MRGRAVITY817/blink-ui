import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { breadcrumbStyles } from './page-header.styles.js';

/**
 * Breadcrumb navigation following WAI-ARIA Breadcrumb pattern.
 * Visual separators via CSS `::before` (not in DOM).
 * Supports responsive collapse to show only the first and last N items
 * with an ellipsis indicator in between.
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

  /**
   * Maximum number of visible items. When set to a positive number and the total
   * items exceed this count, middle items collapse to an ellipsis.
   * -1 means show all items (no collapse).
   */
  @property({ type: Number, attribute: 'max-items' })
  maxItems = -1;

  @state()
  private _items: Element[] = [];

  private _handleSlotChange(): void {
    const items = Array.from(this.querySelectorAll('bl-breadcrumb-item'));
    this._items = items;

    // Mark the last item as current
    items.forEach((item, i) => {
      if (i === items.length - 1) {
        item.setAttribute('current', '');
      } else {
        item.removeAttribute('current');
      }
    });

    this._applyCollapse();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('maxItems')) {
      this._applyCollapse();
    }
  }

  private _applyCollapse(): void {
    const items = this._items;
    if (items.length === 0) return;

    // Reset all items to visible, remove any existing ellipsis
    items.forEach((item) => {
      (item as HTMLElement).style.display = '';
      (item as HTMLElement).removeAttribute('data-collapsed');
    });

    const existingEllipsis = this.querySelector('[data-breadcrumb-ellipsis]');
    if (existingEllipsis) {
      existingEllipsis.remove();
    }

    // No collapse needed
    if (this.maxItems < 0 || items.length <= this.maxItems) {
      return;
    }

    // We need at least 2 for collapse to make sense (first + last)
    const maxVisible = Math.max(2, this.maxItems);
    if (items.length <= maxVisible) return;

    // Show first item, last (maxVisible - 1) items, hide the rest
    const keepFromEnd = maxVisible - 1;
    const hideStart = 1;
    const hideEnd = items.length - keepFromEnd;

    for (let i = hideStart; i < hideEnd; i++) {
      (items[i] as HTMLElement).style.display = 'none';
      (items[i] as HTMLElement).setAttribute('data-collapsed', '');
    }

    // Insert ellipsis element after the first visible item
    const ellipsis = document.createElement('bl-breadcrumb-item');
    ellipsis.setAttribute('data-breadcrumb-ellipsis', '');
    ellipsis.setAttribute('aria-hidden', 'true');
    ellipsis.textContent = '\u2026';
    items[0].after(ellipsis);
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
