import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens';
import { buttonStyles } from './button.styles';

/** Supported button variant values. */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/** Supported button size values. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A customisable button component for the Blink UI design system.
 *
 * @element bl-button
 *
 * @slot - Default slot for button content (text, icons, etc.)
 *
 * @csspart button - The native `<button>` element, exposed for external styling.
 *
 * @cssproperty --bl-color-primary-600 - Primary variant background color.
 * @cssproperty --bl-color-primary-700 - Primary variant hover background color.
 * @cssproperty --bl-color-danger-600 - Danger variant background color.
 * @cssproperty --bl-color-danger-700 - Danger variant hover background color.
 * @cssproperty --bl-color-neutral-300 - Secondary variant border color.
 * @cssproperty --bl-color-neutral-700 - Secondary and ghost variant text color.
 * @cssproperty --bl-focus-ring - Focus ring shorthand applied on :focus-visible.
 * @cssproperty --bl-radius-md - Border radius for the button.
 * @cssproperty --bl-transition-fast - Transition duration and easing for interactive states.
 */
@customElement('bl-button')
export class BlButton extends LitElement {
  static override styles = [tokens, buttonStyles];

  /**
   * The visual style of the button.
   * @attr variant
   */
  @property({ reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * The size of the button.
   * @attr size
   */
  @property({ reflect: true })
  size: ButtonSize = 'md';

  /**
   * When true the button is non-interactive and visually dimmed.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  protected override render() {
    return html`
      <button
        part="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : nothing}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-button': BlButton;
  }
}
