import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens';
import { badgeStyles } from './badge.styles';

/** Supported badge variant values. */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

/** Supported badge size values. */
export type BadgeSize = 'sm' | 'md';

/**
 * A lightweight badge component for the Blink UI design system.
 *
 * Badges are used to highlight statuses, counts, or labels with a pill-shaped
 * indicator in various semantic colours.
 *
 * @element bl-badge
 *
 * @slot - Default slot for badge content (text, numbers, etc.)
 *
 * @csspart badge - The inner `<span>` element, exposed for external styling.
 *
 * @cssproperty --bl-color-primary-100 - Primary variant background color.
 * @cssproperty --bl-color-primary-700 - Primary variant text color.
 * @cssproperty --bl-color-secondary-100 - Secondary variant background color.
 * @cssproperty --bl-color-secondary-700 - Secondary variant text color.
 * @cssproperty --bl-color-success-100 - Success variant background color.
 * @cssproperty --bl-color-success-700 - Success variant text color.
 * @cssproperty --bl-color-warning-100 - Warning variant background color.
 * @cssproperty --bl-color-warning-700 - Warning variant text color.
 * @cssproperty --bl-color-danger-100 - Danger variant background color.
 * @cssproperty --bl-color-danger-700 - Danger variant text color.
 * @cssproperty --bl-color-neutral-100 - Neutral variant background color.
 * @cssproperty --bl-color-neutral-700 - Neutral variant text color.
 * @cssproperty --bl-radius-full - Border radius for the pill shape.
 */
@customElement('bl-badge')
export class BlBadge extends LitElement {
  static override styles = [tokens, badgeStyles];

  /**
   * The visual style of the badge.
   * @attr variant
   */
  @property({ reflect: true })
  variant: BadgeVariant = 'neutral';

  /**
   * The size of the badge.
   * @attr size
   */
  @property({ reflect: true })
  size: BadgeSize = 'md';

  protected override render() {
    return html`
      <span part="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-badge': BlBadge;
  }
}
