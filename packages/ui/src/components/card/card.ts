import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens';
import { cardStyles } from './card.styles';

/** Supported card variant values. */
export type CardVariant = 'outlined' | 'elevated';

/**
 * A card component for the Blink UI design system.
 *
 * Cards group related content and actions in a visually contained surface.
 *
 * @element bl-card
 *
 * @slot header - Optional header content displayed at the top of the card.
 * @slot - Default slot for the card body content.
 * @slot footer - Optional footer content displayed at the bottom of the card.
 *
 * @csspart container - The outer card wrapper.
 * @csspart header - The header section of the card.
 * @csspart body - The body section of the card.
 * @csspart footer - The footer section of the card.
 *
 * @cssproperty --bl-color-neutral-200 - Border color for the outlined variant and internal dividers.
 * @cssproperty --bl-radius-lg - Border radius for the card container.
 * @cssproperty --bl-spacing-md - Vertical padding for header and footer.
 * @cssproperty --bl-spacing-lg - Horizontal padding for header/footer and all-around padding for body.
 */
@customElement('bl-card')
export class BlCard extends LitElement {
  static override styles = [tokens, cardStyles];

  /**
   * The visual style of the card.
   * - `outlined` (default) displays a bordered card.
   * - `elevated` displays a card with a box shadow and no visible border.
   * @attr variant
   */
  @property({ reflect: true })
  variant: CardVariant = 'outlined';

  protected override render() {
    return html`
      <div part="container">
        <div part="header">
          <slot name="header"></slot>
        </div>
        <div part="body">
          <slot></slot>
        </div>
        <div part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-card': BlCard;
  }
}
