import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { accordionItemStyles } from './accordion-item.styles.js';

/**
 * An individual accordion item with a trigger and collapsible panel.
 *
 * @element bl-accordion-item
 * @slot trigger - The header/trigger content.
 * @slot - Default slot for the panel content.
 * @fires bl-accordion-toggle - Emitted when item is toggled.
 */
@customElement('bl-accordion-item')
export class BlAccordionItem extends LitElement {
  static override styles = [tokens, accordionItemStyles];

  private _headerId = `bl-acc-h-${Math.random().toString(36).slice(2, 9)}`;
  private _panelId = `bl-acc-p-${Math.random().toString(36).slice(2, 9)}`;

  /** Whether this item is expanded. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether this item is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** A unique value identifying this item within the accordion. */
  @property()
  value = '';

  private _handleClick(): void {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('bl-accordion-toggle', {
        detail: { value: this.value, open: !this.open },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  protected override render() {
    return html`
      <button
        class="trigger"
        id=${this._headerId}
        part="trigger"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${this._panelId}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="trigger"></slot>
        <svg
          class="chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div
        class="panel"
        id=${this._panelId}
        role="region"
        aria-labelledby=${this._headerId}
      >
        <div class="panel-inner">
          <div class="panel-content" part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-accordion-item': BlAccordionItem;
  }
}
