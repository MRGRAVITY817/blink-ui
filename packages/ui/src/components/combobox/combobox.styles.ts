import { css } from 'lit';

export const comboboxStyles = css`
  :host {
    display: inline-block;
    position: relative;
    min-width: 180px;
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-md);
    cursor: text;
    font-family: var(--bl-font-family-base);
    box-shadow: var(--bl-shadow-xs);
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  .input-wrapper:focus-within {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  :host([open]) .input-wrapper {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-900);
    min-width: 0;
  }

  input::placeholder {
    color: var(--bl-color-neutral-400);
  }

  .trigger-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-500);
    transition: transform var(--bl-transition-fast);
  }

  :host([open]) .trigger-icon {
    transform: rotate(180deg);
  }

  /* Sizes */
  :host([size='sm']) .input-wrapper {
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
  }

  :host([size='sm']) input {
    font-size: var(--bl-font-size-xs);
  }

  :host([size='lg']) .input-wrapper {
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
  }

  :host([size='lg']) input {
    font-size: var(--bl-font-size-md);
  }

  .listbox {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    min-width: 100%;
    max-height: 240px;
    overflow-y: auto;
    padding: var(--bl-spacing-xs);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);

    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-enter);
  }

  .listbox[data-state='entering'],
  .listbox[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .listbox[data-state='exiting'] {
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }
`;

export const comboboxItemStyles = css`
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

  :host([aria-selected='true']) .check {
    visibility: visible;
  }

  .check {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    visibility: hidden;
  }

  :host([aria-disabled='true']) .item {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const comboboxGroupStyles = css`
  :host {
    display: block;
  }

  .label {
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm) var(--bl-spacing-xs);
    font-size: var(--bl-font-size-xs);
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    font-family: var(--bl-font-family-base);
  }
`;

export const comboboxEmptyStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-lg) var(--bl-spacing-md);
    text-align: center;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-500);
    font-family: var(--bl-font-family-base);
  }
`;
