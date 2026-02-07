import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../../styles/tokens.js';
import { commandDialogStyles } from './command.styles.js';
import { FocusTrapController } from '../../controllers/focus-trap.js';
import { AnimationController } from '../../controllers/animation.js';

/**
 * Modal command palette wrapper with focus trap.
 * Registers a global `keydown` listener for Cmd+K / Ctrl+K.
 *
 * @element bl-command-dialog
 * @slot - `bl-command` element.
 * @fires bl-command-select - Bubbles up from the inner bl-command.
 */
@customElement('bl-command-dialog')
export class BlCommandDialog extends LitElement {
  static override styles = [tokens, commandDialogStyles];

  private _focusTrap = new FocusTrapController(this, { active: false });
  private _animation = new AnimationController(this);

  /** Whether the command dialog is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Accessible label for the dialog. */
  @property()
  label = 'Command palette';

  @state()
  private _visible = false;

  private _inertElements: { el: Element; prev: string | null }[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleGlobalKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleGlobalKeyDown);
    this._restoreInert();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._show();
      else if (this._visible) this._hide();
    }
  }

  private _handleGlobalKeyDown = (e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.open = !this.open;
    }
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.open = false;
    }
  };

  private async _show(): Promise<void> {
    if (this._visible) return;
    this._visible = true;
    this._applyInert();
    await this.updateComplete;

    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    const dialog = this.shadowRoot!.querySelector<HTMLElement>('.dialog');
    if (backdrop) this._animation.enter(backdrop);
    if (dialog) this._animation.enter(dialog);

    this._focusTrap.active = true;
  }

  private async _hide(): Promise<void> {
    if (!this._visible) return;
    this._focusTrap.active = false;

    const backdrop = this.shadowRoot!.querySelector<HTMLElement>('.backdrop');
    const dialog = this.shadowRoot!.querySelector<HTMLElement>('.dialog');
    const promises: Promise<void>[] = [];
    if (dialog) promises.push(this._animation.exit(dialog));
    if (backdrop) promises.push(this._animation.exit(backdrop));
    await Promise.all(promises);

    this._visible = false;
    this._restoreInert();
  }

  private _handleBackdropClick = (): void => {
    this.open = false;
  };

  private _applyInert(): void {
    this._inertElements = [];
    for (const el of document.body.children) {
      if (el === this || el.contains(this)) continue;
      if (el instanceof HTMLElement) {
        this._inertElements.push({ el, prev: el.getAttribute('inert') });
        el.setAttribute('inert', '');
      }
    }
  }

  private _restoreInert(): void {
    for (const { el, prev } of this._inertElements) {
      if (prev === null) (el as HTMLElement).removeAttribute('inert');
      else (el as HTMLElement).setAttribute('inert', prev);
    }
    this._inertElements = [];
  }

  protected override render() {
    if (!this._visible) return nothing;

    return html`
      <div class="backdrop" @click=${this._handleBackdropClick}></div>
      <div
        class="dialog"
        part="dialog"
        role="dialog"
        aria-modal="true"
        aria-label=${this.label}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-command-dialog': BlCommandDialog;
  }
}
