import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { pageHeaderAvatarStyles } from './page-header.styles.js';

export type PageHeaderAvatarSize = 'sm' | 'md' | 'lg';

/**
 * Avatar display for page header with optional verification badge.
 * Designed to be positioned at the banner edge in banner-variant page headers.
 *
 * @element bl-page-header-avatar
 * @csspart avatar - The avatar container.
 * @csspart image - The avatar image element.
 * @csspart badge - The verification badge.
 */
@customElement('bl-page-header-avatar')
export class BlPageHeaderAvatar extends LitElement {
  static override styles = [tokens, pageHeaderAvatarStyles];

  /** Image source URL. */
  @property()
  src = '';

  /** Alt text for the image. */
  @property()
  alt = '';

  /** Size of the avatar. */
  @property({ reflect: true })
  size: PageHeaderAvatarSize = 'md';

  /** Whether to show a verification badge. */
  @property({ type: Boolean, reflect: true })
  verified = false;

  @state()
  private _imgFailed = false;

  private _handleImgError(): void {
    this._imgFailed = true;
  }

  protected override render() {
    const showImage = this.src && !this._imgFailed;

    return html`
      <div class="avatar-wrapper" part="avatar">
        <div class="avatar">
          ${showImage
            ? html`<img
                part="image"
                src=${this.src}
                alt=${this.alt || nothing}
                @error=${this._handleImgError}
              />`
            : html`<span class="fallback-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                  />
                </svg>
              </span>`}
        </div>
        ${this.verified
          ? html`<span class="verified-badge" part="badge" aria-label="Verified">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-page-header-avatar': BlPageHeaderAvatar;
  }
}
