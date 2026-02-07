import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { accordionStyles } from './accordion.styles.js';
import type { BlAccordionItem } from './accordion-item.js';

/**
 * A container for accordion items. Manages which items are open.
 *
 * @element bl-accordion
 * @slot - `bl-accordion-item` elements.
 * @fires bl-change - Emitted when the open items change.
 */
@customElement('bl-accordion')
export class BlAccordion extends LitElement {
  static override styles = [tokens, accordionStyles];

  /** Allow multiple items to be open simultaneously. */
  @property({ type: Boolean })
  multiple = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('bl-accordion-toggle', this._handleToggle as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('bl-accordion-toggle', this._handleToggle as EventListener);
  }

  private _handleToggle = (e: CustomEvent<{ value: string; open: boolean }>): void => {
    e.stopPropagation();
    const { value, open } = e.detail;

    const items = this._getItems();

    if (open) {
      if (!this.multiple) {
        // Close all others
        items.forEach((item) => {
          if (item.value !== value) item.open = false;
        });
      }
      const target = items.find((item) => item.value === value);
      if (target) target.open = true;
    } else {
      const target = items.find((item) => item.value === value);
      if (target) target.open = false;
    }

    const openValues = items.filter((item) => item.open).map((item) => item.value);
    this.dispatchEvent(
      new CustomEvent('bl-change', {
        detail: { value: this.multiple ? openValues : openValues[0] ?? '' },
        composed: true,
        bubbles: true,
      }),
    );
  };

  private _getItems(): BlAccordionItem[] {
    return Array.from(this.querySelectorAll<BlAccordionItem>('bl-accordion-item'));
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    const triggers = this._getItems()
      .filter((item) => !item.disabled)
      .map(
        (item) =>
          item.shadowRoot?.querySelector<HTMLElement>('.trigger'),
      )
      .filter(Boolean) as HTMLElement[];

    const current = triggers.indexOf(
      (e.target as HTMLElement)?.closest('bl-accordion-item')
        ?.shadowRoot?.querySelector<HTMLElement>('.trigger') ?? (null as never),
    );
    if (current === -1) return;

    let next = -1;
    if (e.key === 'ArrowDown') {
      next = current + 1 >= triggers.length ? 0 : current + 1;
    } else if (e.key === 'ArrowUp') {
      next = current - 1 < 0 ? triggers.length - 1 : current - 1;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = triggers.length - 1;
    }

    if (next !== -1) {
      e.preventDefault();
      triggers[next]?.focus();
    }
  };

  protected override render() {
    return html`<slot @keydown=${this._handleKeyDown}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-accordion': BlAccordion;
  }
}
