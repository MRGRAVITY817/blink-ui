import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { tokens } from '../../styles/tokens.js';
import { pageHeaderStyles } from './page-header.styles.js';

export type PageHeaderVariant = 'simple' | 'banner';

/**
 * Page header with title, description, and actions layout via named slots.
 * Supports simple and banner variants with optional centered layout.
 *
 * @element bl-page-header
 * @slot breadcrumb - Breadcrumb navigation above the title.
 * @slot back - Back button content (shown on mobile when breadcrumbs are hidden).
 * @slot avatar - Avatar positioned at the banner edge (use with banner variant).
 * @slot - Title content (typically an h1).
 * @slot description - Subtitle/description text.
 * @slot actions - Action buttons/links.
 * @slot tabs - Tab navigation below the header content.
 * @slot search - Search input area.
 */
@customElement('bl-page-header')
export class BlPageHeader extends LitElement {
  static override styles = [tokens, pageHeaderStyles];

  /** Visual variant of the page header. */
  @property({ reflect: true })
  variant: PageHeaderVariant = 'simple';

  /** Whether to center-align the header content. */
  @property({ type: Boolean, reflect: true })
  centered = false;

  protected override render() {
    const classes = {
      'page-header': true,
      'page-header--banner': this.variant === 'banner',
      'page-header--centered': this.centered,
    };

    return html`
      <div class=${classMap(classes)} part="base">
        ${this.variant === 'banner'
          ? html`<div class="banner-bg" part="banner"></div>`
          : nothing}

        <div class="header-inner">
          <div class="avatar-area">
            <slot name="avatar"></slot>
          </div>

          <div class="nav-area">
            <div class="back-button" part="back">
              <slot name="back"></slot>
            </div>
            <div class="breadcrumb-area" part="breadcrumb">
              <slot name="breadcrumb"></slot>
            </div>
          </div>

          <div class="header-row">
            <div class="header-content">
              <div class="title" part="title">
                <slot></slot>
              </div>
              <div class="description" part="description">
                <slot name="description"></slot>
              </div>
            </div>
            <div class="actions" part="actions">
              <slot name="actions"></slot>
            </div>
          </div>

          <div class="search-area" part="search">
            <slot name="search"></slot>
          </div>

          <div class="tabs-area" part="tabs">
            <slot name="tabs"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-page-header': BlPageHeader;
  }
}
