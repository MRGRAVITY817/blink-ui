import { css } from 'lit';

export const selectStyles = css`
  :host {
    display: inline-block;
    position: relative;
    min-width: 180px;
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-md);
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-900);
    box-shadow: var(--bl-shadow-xs);
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  .trigger:hover {
    border-color: var(--bl-color-neutral-400);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  :host([open]) .trigger {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  .trigger-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trigger-text.placeholder {
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
  :host([size='sm']) .trigger {
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    font-size: var(--bl-font-size-xs);
    min-height: 1.75rem;
  }

  :host([size='lg']) .trigger {
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
    font-size: var(--bl-font-size-md);
    min-height: 2.75rem;
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

  /* Hidden native select for form submission */
  .native-select {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
