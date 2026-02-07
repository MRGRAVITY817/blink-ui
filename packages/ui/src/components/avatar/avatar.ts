import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { avatarStyles } from './avatar.styles.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * An avatar component with image and initials fallback.
 *
 * @element bl-avatar
 * @csspart avatar - The avatar container.
 */
@customElement('bl-avatar')
export class BlAvatar extends LitElement {
  static override styles = [tokens, avatarStyles];

  /** Image source URL. */
  @property()
  src = '';

  /** Alt text for the image. */
  @property()
  alt = '';

  /** Initials fallback when no image is provided or image fails to load. */
  @property()
  initials = '';

  /** Size of the avatar. */
  @property({ reflect: true })
  size: AvatarSize = 'md';

  @state()
  private _imgFailed = false;

  private _handleImgError(): void {
    this._imgFailed = true;
  }

  protected override render() {
    const showImage = this.src && !this._imgFailed;
    const showInitials = !showImage && this.initials;

    return html`
      <div
        part="avatar"
        class="avatar"
        role="img"
        aria-label=${this.alt || this.initials || nothing}
      >
        ${showImage
          ? html`<img
              src=${this.src}
              alt=${this.alt || nothing}
              @error=${this._handleImgError}
            />`
          : showInitials
            ? html`<span>${this.initials}</span>`
            : html`<span class="fallback-icon"
                ><svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                  />
                </svg></span
              >`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-avatar': BlAvatar;
  }
}
