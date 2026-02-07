import { css } from 'lit';

export const sidebarStyles = css`
  :host {
    --bl-sidebar-width: 260px;
    --bl-sidebar-collapsed-width: 56px;
    --bl-sidebar-breakpoint: 768px;
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    width: var(--bl-sidebar-width);
    height: 100%;
    background-color: #fff;
    border-right: 1px solid var(--bl-color-neutral-200);
    overflow: hidden;
    transition: width var(--bl-transition-normal);
  }

  :host([collapsed]) .sidebar {
    width: var(--bl-sidebar-collapsed-width);
  }

  /* Drawer mode (mobile) */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bl-z-overlay);
    background-color: var(--bl-overlay-bg);
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

  :host([mode='drawer']) .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--bl-z-overlay);
    height: 100vh;
    border-right: none;
    box-shadow: var(--bl-shadow-xl);
    transform: translateX(-100%);
    transition:
      transform var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  :host([mode='drawer'][open]) .sidebar {
    transform: translateX(0);
  }
`;

export const sidebarHeaderStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-md) var(--bl-spacing-md);
    border-bottom: 1px solid var(--bl-color-neutral-200);
    flex-shrink: 0;
  }
`;

export const sidebarContentStyles = css`
  :host {
    display: block;
    flex: 1;
    overflow-y: auto;
    padding: var(--bl-spacing-sm);
  }
`;

export const sidebarFooterStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-md);
    border-top: 1px solid var(--bl-color-neutral-200);
    flex-shrink: 0;
  }
`;

export const sidebarGroupStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-xs) 0;
  }

  :host(:not(:first-child)) {
    border-top: 1px solid var(--bl-color-neutral-100);
    margin-top: var(--bl-spacing-xs);
    padding-top: var(--bl-spacing-sm);
  }
`;

export const sidebarGroupLabelStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    font-size: var(--bl-font-size-xs);
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: var(--bl-font-family-base);
  }
`;

export const sidebarMenuStyles = css`
  :host {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const sidebarMenuItemStyles = css`
  :host {
    display: block;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
    text-decoration: none;
    font-size: var(--bl-font-size-sm);
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--bl-font-family-base);
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  .menu-item:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-900);
  }

  :host([active]) .menu-item {
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
    font-weight: 500;
  }

  .menu-item:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }

  :host([disabled]) .menu-item {
    opacity: 0.5;
    pointer-events: none;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge {
    flex-shrink: 0;
  }
`;

export const sidebarTriggerStyles = css`
  :host {
    display: inline-flex;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-500);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  button:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-800);
  }

  button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }
`;
