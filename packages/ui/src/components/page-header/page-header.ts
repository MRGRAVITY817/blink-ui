import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { pageHeaderStyles } from './page-header.styles.js';

/**
 * Page header with title, description, and actions layout via named slots.
 *
 * @element bl-page-header
 * @slot breadcrumb - Breadcrumb navigation above the title.
 * @slot - Title content (typically an h1).
 * @slot description - Subtitle/description text.
 * @slot actions - Action buttons/links.
 */
@customElement('bl-page-header')
export class BlPageHeader extends LitElement {
  static override styles = [tokens, pageHeaderStyles];

  protected override render() {
    return html`
      <div class="page-header" part="base">
        <div class="breadcrumb-area">
          <slot name="breadcrumb"></slot>
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-page-header': BlPageHeader;
  }
}
