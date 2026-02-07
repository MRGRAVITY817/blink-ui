import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { portalStyles } from './portal.styles.js';

/**
 * Renders children outside the parent DOM hierarchy (into document.body by default).
 *
 * @element bl-portal
 * @slot - Content to render in the portal target.
 */
@customElement('bl-portal')
export class BlPortal extends LitElement {
  static override styles = [portalStyles];

  /** CSS selector for the target container. Default: 'body' */
  @property()
  container = 'body';

  private _portalContainer: HTMLDivElement | null = null;
  private _observer: MutationObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._createPortal();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyPortal();
  }

  private _createPortal(): void {
    const target = document.querySelector(this.container);
    if (!target) return;

    this._portalContainer = document.createElement('div');
    this._portalContainer.setAttribute('data-bl-portal', '');
    target.appendChild(this._portalContainer);

    this._moveSlottedContent();

    // Observe slot changes to keep portal content in sync
    this._observer = new MutationObserver(() => this._moveSlottedContent());
    this._observer.observe(this, { childList: true, subtree: true });
  }

  private _destroyPortal(): void {
    this._observer?.disconnect();
    this._observer = null;
    this._portalContainer?.remove();
    this._portalContainer = null;
  }

  private _moveSlottedContent(): void {
    if (!this._portalContainer) return;
    // Clone children into portal target
    this._portalContainer.innerHTML = '';
    for (const child of Array.from(this.childNodes)) {
      this._portalContainer.appendChild(child.cloneNode(true));
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-portal': BlPortal;
  }
}
