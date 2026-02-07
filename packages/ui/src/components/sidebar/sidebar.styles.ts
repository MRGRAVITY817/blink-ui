import { css } from 'lit';

export const sidebarStyles = css`
  :host {
    --bl-sidebar-width: 260px;
    --bl-sidebar-width-collapsed: 56px;
    --bl-sidebar-collapsed-width: var(--bl-sidebar-width-collapsed);
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
    width: var(--bl-sidebar-width-collapsed);
  }

  /* Variant: floating */
  :host([variant='floating']) .sidebar {
    margin: var(--bl-spacing-sm);
    height: calc(100% - var(--bl-spacing-md));
    border-radius: var(--bl-radius-lg);
    border: 1px solid var(--bl-color-neutral-200);
    box-shadow: var(--bl-shadow-lg);
  }

  /* Variant: inset */
  :host([variant='inset']) .sidebar {
    border-right: none;
    background-color: var(--bl-color-neutral-50);
  }

  /* Collapsible: icon mode - hide labels/badges in collapsed state */
  :host([collapsible='icon'][collapsed]) .sidebar {
    width: var(--bl-sidebar-width-collapsed);
  }

  /* Collapsible: offcanvas mode - fully hide sidebar */
  :host([collapsible='offcanvas'][collapsed]) .sidebar {
    width: 0;
    border-right-width: 0;
    overflow: hidden;
  }

  :host([collapsible='offcanvas'][collapsed]) {
    width: 0;
  }

  /* Collapsible: none - do not collapse */
  :host([collapsible='none']) .sidebar {
    width: var(--bl-sidebar-width);
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

  .group-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font: inherit;
    color: inherit;
  }

  :host(:not([collapsible])) .group-label {
    cursor: default;
  }

  .group-label-text {
    flex: 1;
  }

  .chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: var(--bl-spacing-xs);
    color: var(--bl-color-neutral-400);
    transition: transform var(--bl-transition-fast);
    flex-shrink: 0;
  }

  :host(:not([collapsible])) .chevron {
    display: none;
  }

  :host([collapsed]) .chevron {
    transform: rotate(-90deg);
  }

  .group-content {
    overflow: hidden;
    transition: height var(--bl-transition-normal);
  }

  .group-content-inner {
    /* This div provides measurable height for animation */
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
    position: relative;
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

  :host([active]) .menu-item,
  :host([isActive]) .menu-item {
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

  /* Tooltip for icon-only collapsed mode */
  .tooltip {
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
    z-index: var(--bl-z-dropdown);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    background-color: var(--bl-color-neutral-800);
    color: #fff;
    font-size: var(--bl-font-size-xs);
    border-radius: var(--bl-radius-sm);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--bl-transition-fast);
    box-shadow: var(--bl-shadow-md);
  }

  .tooltip[data-visible] {
    opacity: 1;
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

/* --- New style exports for Phase 4 --- */

export const sidebarMenuSubStyles = css`
  :host {
    display: block;
  }

  .sub-trigger {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
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

  .sub-trigger:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-900);
  }

  .sub-trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }

  .sub-trigger-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .sub-trigger-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sub-trigger-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-400);
    transition: transform var(--bl-transition-fast);
  }

  :host([open]) .sub-trigger-chevron {
    transform: rotate(90deg);
  }

  .sub-content {
    overflow: hidden;
    height: 0;
    transition: height var(--bl-transition-normal);
  }

  :host([open]) .sub-content {
    /* height is set dynamically via JS */
  }

  .sub-content-inner {
    padding-left: var(--bl-spacing-lg);
    padding-top: var(--bl-spacing-xs);
    padding-bottom: var(--bl-spacing-xs);
  }

  /* Indentation line for nested items */
  .sub-content-inner::before {
    content: '';
    position: absolute;
    left: calc(var(--bl-spacing-sm) + 9px);
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--bl-color-neutral-200);
  }

  .sub-content-inner {
    position: relative;
  }
`;

export const sidebarMenuActionStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  :host([show-on-hover]) {
    opacity: 0;
    transition: opacity var(--bl-transition-fast);
  }

  /* Show when parent is hovered - use :host-context or slotted approach */
  :host([data-visible]),
  :host(:hover),
  :host(:focus-within) {
    opacity: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: none;
    border-radius: var(--bl-radius-sm);
    color: var(--bl-color-neutral-400);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  button:hover {
    background-color: var(--bl-color-neutral-200);
    color: var(--bl-color-neutral-700);
  }

  button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 1px;
  }
`;

export const sidebarRailStyles = css`
  :host {
    display: block;
    position: absolute;
    top: 0;
    right: -4px;
    width: 8px;
    height: 100%;
    z-index: 1;
    cursor: ew-resize;
  }

  .rail {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--bl-transition-fast);
  }

  .rail::after {
    content: '';
    width: 2px;
    height: 100%;
    background-color: transparent;
    transition: background-color var(--bl-transition-fast);
    border-radius: var(--bl-radius-full);
  }

  .rail:hover::after {
    background-color: var(--bl-color-primary-400);
  }

  :host(:hover) .rail::after {
    background-color: var(--bl-color-primary-400);
  }

  .rail:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
    border-radius: var(--bl-radius-sm);
  }
`;

export const sidebarMenuSkeletonStyles = css`
  :host {
    display: block;
    padding: var(--bl-spacing-xs) 0;
  }

  .skeleton-item {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm);
    border-radius: var(--bl-radius-md);
  }

  .skeleton-icon {
    width: 20px;
    height: 20px;
    border-radius: var(--bl-radius-sm);
    background-color: var(--bl-color-neutral-200);
    flex-shrink: 0;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .skeleton-text {
    height: 14px;
    border-radius: var(--bl-radius-sm);
    background-color: var(--bl-color-neutral-200);
    flex: 1;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
    animation-delay: 75ms;
  }

  /* Vary widths for visual interest */
  .skeleton-item:nth-child(1) .skeleton-text { width: 75%; flex: none; }
  .skeleton-item:nth-child(2) .skeleton-text { width: 60%; flex: none; }
  .skeleton-item:nth-child(3) .skeleton-text { width: 85%; flex: none; }
  .skeleton-item:nth-child(4) .skeleton-text { width: 50%; flex: none; }
  .skeleton-item:nth-child(5) .skeleton-text { width: 70%; flex: none; }
  .skeleton-item:nth-child(6) .skeleton-text { width: 65%; flex: none; }
  .skeleton-item:nth-child(7) .skeleton-text { width: 80%; flex: none; }
  .skeleton-item:nth-child(8) .skeleton-text { width: 55%; flex: none; }

  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;
