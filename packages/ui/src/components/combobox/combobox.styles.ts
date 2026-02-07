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

  /* Multi-select wrapper layout */
  :host([multiple]) .input-wrapper {
    flex-wrap: wrap;
    gap: var(--bl-spacing-xs);
    padding: var(--bl-spacing-xs) var(--bl-spacing-md);
    min-height: 38px;
    align-items: center;
  }

  :host([multiple]) .input-row {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 60px;
    gap: var(--bl-spacing-sm);
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

  /* Clear button */
  .clear-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background: none;
    border: none;
    border-radius: var(--bl-radius-full);
    color: var(--bl-color-neutral-400);
    cursor: pointer;
    transition:
      color var(--bl-transition-fast),
      background-color var(--bl-transition-fast);
  }

  .clear-button:hover {
    color: var(--bl-color-neutral-700);
    background-color: var(--bl-color-neutral-100);
  }

  .clear-button:focus-visible {
    outline: 2px solid var(--bl-color-primary-500);
    outline-offset: 1px;
  }

  .clear-button svg {
    width: 12px;
    height: 12px;
  }

  /* Icon separator between clear and chevron */
  .icon-separator {
    width: 1px;
    height: 16px;
    background-color: var(--bl-color-neutral-200);
    flex-shrink: 0;
  }

  /* Sizes */
  :host([size='sm']) .input-wrapper {
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
  }

  :host([size='sm']) input {
    font-size: var(--bl-font-size-xs);
  }

  :host([size='sm'][multiple]) .input-wrapper {
    min-height: 30px;
  }

  :host([size='lg']) .input-wrapper {
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
  }

  :host([size='lg']) input {
    font-size: var(--bl-font-size-md);
  }

  :host([size='lg'][multiple]) .input-wrapper {
    min-height: 46px;
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

  /* Group separator styling within listbox */
  .listbox ::slotted(bl-combobox-group + bl-combobox-group) {
    border-top: 1px solid var(--bl-color-neutral-200);
    margin-top: var(--bl-spacing-xs);
    padding-top: var(--bl-spacing-xs);
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

  :host([aria-selected='true']) .item {
    font-weight: 500;
  }

  .check {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    visibility: hidden;
    color: var(--bl-color-primary-600);
  }

  /* Multi-select checkbox indicator */
  :host([data-multiselect]) .check {
    display: none;
  }

  :host([data-multiselect]) .multi-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border: 1.5px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-sm);
    background-color: #fff;
    transition:
      border-color var(--bl-transition-fast),
      background-color var(--bl-transition-fast);
  }

  :host([data-multiselect]) .multi-check svg {
    width: 10px;
    height: 10px;
    opacity: 0;
    transition: opacity var(--bl-transition-fast);
  }

  :host([data-multiselect][aria-selected='true']) .multi-check {
    border-color: var(--bl-color-primary-600);
    background-color: var(--bl-color-primary-600);
  }

  :host([data-multiselect][aria-selected='true']) .multi-check svg {
    opacity: 1;
    color: #fff;
  }

  :host(:not([data-multiselect])) .multi-check {
    display: none;
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

  /* Separator between groups */
  :host(:not(:first-child)) {
    border-top: 1px solid var(--bl-color-neutral-200);
    margin-top: var(--bl-spacing-xs);
    padding-top: var(--bl-spacing-xs);
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

export const comboboxChipsStyles = css`
  :host {
    display: inline;
  }

  .chips {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--bl-spacing-xs);
    align-items: center;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px var(--bl-spacing-sm) 1px var(--bl-spacing-sm);
    background-color: var(--bl-color-primary-50);
    border: 1px solid var(--bl-color-primary-200);
    border-radius: var(--bl-radius-full);
    font-size: var(--bl-font-size-xs);
    font-family: var(--bl-font-family-base);
    color: var(--bl-color-primary-700);
    line-height: 1.4;
    max-width: 150px;
    white-space: nowrap;
  }

  .chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0 -2px 0 0;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background: none;
    border: none;
    border-radius: var(--bl-radius-full);
    color: var(--bl-color-primary-400);
    cursor: pointer;
    transition:
      color var(--bl-transition-fast),
      background-color var(--bl-transition-fast);
  }

  .chip-remove:hover {
    color: var(--bl-color-primary-700);
    background-color: var(--bl-color-primary-100);
  }

  .chip-remove:focus-visible {
    outline: 2px solid var(--bl-color-primary-500);
    outline-offset: 1px;
  }

  .chip-remove svg {
    width: 10px;
    height: 10px;
  }

  :host([disabled]) .chip {
    opacity: 0.7;
    background-color: var(--bl-color-neutral-100);
    border-color: var(--bl-color-neutral-200);
    color: var(--bl-color-neutral-500);
  }
`;

export const comboboxTriggerStyles = css`
  :host {
    display: inline-block;
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
    min-width: 180px;
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
    text-align: left;
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast),
      background-color var(--bl-transition-fast);
  }

  .trigger:hover {
    background-color: var(--bl-color-neutral-50);
  }

  .trigger:focus-visible {
    outline: none;
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  :host([open]) .trigger {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  .trigger-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .trigger-text.placeholder {
    color: var(--bl-color-neutral-400);
  }

  .trigger-chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-500);
    transition: transform var(--bl-transition-fast);
  }

  :host([open]) .trigger-chevron {
    transform: rotate(180deg);
  }
`;
