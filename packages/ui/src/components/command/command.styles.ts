import { css } from 'lit';

export const commandStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-lg);
    background-color: #fff;
    overflow: hidden;
  }
`;

export const commandDialogStyles = css`
  :host {
    display: contents;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bl-z-modal);
    background-color: var(--bl-overlay-bg);
    backdrop-filter: blur(var(--bl-overlay-backdrop-blur));
    opacity: 0;
    transition: opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .backdrop[data-state='entering'],
  .backdrop[data-state='entered'] {
    opacity: 1;
  }

  .backdrop[data-state='exiting'] {
    opacity: 0;
    transition: opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  .dialog {
    position: fixed;
    z-index: var(--bl-z-modal);
    top: 20%;
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    max-width: min(640px, calc(100vw - 2rem));
    width: 100%;
    background-color: #fff;
    border-radius: var(--bl-radius-lg);
    box-shadow: var(--bl-shadow-xl);
    overflow: hidden;
    font-family: var(--bl-font-family-base);

    opacity: 0;
    transition:
      opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .dialog[data-state='entering'],
  .dialog[data-state='entered'] {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  .dialog[data-state='exiting'] {
    opacity: 0;
    transform: translateX(-50%) scale(0.95);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }
`;

export const commandInputStyles = css`
  :host {
    display: block;
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
  }

  .search-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-400);
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-900);
  }

  input::placeholder {
    color: var(--bl-color-neutral-400);
  }
`;

export const commandListStyles = css`
  :host {
    display: block;
    max-height: 300px;
    overflow-y: auto;
    padding: var(--bl-spacing-xs);
  }
`;

export const commandGroupStyles = css`
  :host {
    display: block;
  }

  :host(:not(:first-child)) {
    margin-top: var(--bl-spacing-xs);
  }

  .label {
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm) var(--bl-spacing-xs);
    font-size: var(--bl-font-size-xs);
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    font-family: var(--bl-font-family-base);
  }
`;

export const commandItemStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-sm);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    transition: background-color var(--bl-transition-fast);
  }

  .item:hover {
    background-color: var(--bl-color-neutral-100);
  }

  :host([data-highlighted]) .item {
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
  }

  :host([aria-disabled='true']) .item {
    opacity: 0.5;
    pointer-events: none;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-500);
  }

  .label {
    flex: 1;
  }

  .shortcut {
    flex-shrink: 0;
  }
`;

export const commandEmptyStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-xl) var(--bl-spacing-md);
    text-align: center;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-500);
    font-family: var(--bl-font-family-base);
  }
`;

export const commandSeparatorStyles = css`
  :host {
    display: block;
    height: 1px;
    background-color: var(--bl-color-neutral-200);
    margin: var(--bl-spacing-xs) 0;
  }
`;

export const commandShortcutStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-family: var(--bl-font-family-base);
  }

  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 var(--bl-spacing-xs);
    background-color: var(--bl-color-neutral-100);
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-sm);
    font-size: 11px;
    font-family: var(--bl-font-family-base);
    color: var(--bl-color-neutral-600);
  }
`;
