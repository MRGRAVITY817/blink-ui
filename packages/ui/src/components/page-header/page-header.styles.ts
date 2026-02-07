import { css } from 'lit';

/* --------------------------------------------------------------------------
 * Page Header Styles
 * -------------------------------------------------------------------------- */
export const pageHeaderStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  /* --- Base layout -------------------------------------------------------- */
  .page-header {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: var(--bl-spacing-lg);
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  .header-inner {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-md);
    position: relative;
    z-index: 1;
  }

  /* --- Banner variant ----------------------------------------------------- */
  .banner-bg {
    position: absolute;
    inset: 0;
    bottom: auto;
    height: 160px;
    background: linear-gradient(
      135deg,
      var(--bl-color-primary-50) 0%,
      var(--bl-color-primary-100) 40%,
      var(--bl-color-secondary-50) 100%
    );
    border-radius: var(--bl-radius-lg) var(--bl-radius-lg) 0 0;
    z-index: 0;
  }

  .page-header--banner {
    padding-top: var(--bl-spacing-xl);
    border-bottom: none;
  }

  .page-header--banner .header-inner {
    padding-inline: var(--bl-spacing-lg);
    padding-top: 80px;
  }

  .page-header--banner .header-row {
    padding-top: var(--bl-spacing-sm);
  }

  /* --- Centered variant --------------------------------------------------- */
  .page-header--centered .header-inner {
    align-items: center;
    text-align: center;
  }

  .page-header--centered .header-row {
    flex-direction: column;
    align-items: center;
  }

  .page-header--centered .header-content {
    align-items: center;
  }

  .page-header--centered .actions {
    justify-content: center;
    margin-top: var(--bl-spacing-sm);
  }

  .page-header--centered .nav-area {
    justify-content: center;
  }

  .page-header--centered .tabs-area {
    justify-content: center;
  }

  .page-header--centered .search-area {
    max-width: 480px;
    width: 100%;
    margin-inline: auto;
  }

  /* --- Navigation area (breadcrumb + back button) ------------------------- */
  .nav-area {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    min-height: 0;
  }

  .breadcrumb-area {
    display: contents;
  }

  .breadcrumb-area ::slotted(*) {
    margin-bottom: var(--bl-spacing-xs);
  }

  /* Back button: visible on mobile, hidden on desktop */
  .back-button {
    display: none;
  }

  .back-button ::slotted(*) {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-2xs);
    color: var(--bl-color-neutral-500);
    font-size: var(--bl-font-size-sm);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: var(--bl-spacing-2xs) var(--bl-spacing-xs);
    border-radius: var(--bl-radius-sm);
    transition: color var(--bl-transition-fast), background-color var(--bl-transition-fast);
    margin-bottom: var(--bl-spacing-xs);
  }

  .back-button ::slotted(*:hover) {
    color: var(--bl-color-neutral-700);
    background-color: var(--bl-color-neutral-100);
  }

  /* --- Avatar area -------------------------------------------------------- */
  .avatar-area {
    display: contents;
  }

  .page-header--banner .avatar-area {
    display: block;
    position: relative;
    z-index: 2;
    margin-bottom: var(--bl-spacing-xs);
  }

  /* --- Header row --------------------------------------------------------- */
  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--bl-spacing-lg);
  }

  .header-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .title ::slotted(*) {
    margin: 0;
    font-size: var(--bl-font-size-xl);
    font-weight: 600;
    color: var(--bl-color-neutral-900);
    line-height: 1.3;
  }

  .description {
    margin-top: var(--bl-spacing-xs);
  }

  .description ::slotted(*) {
    margin: 0;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-500);
    line-height: 1.5;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    flex-shrink: 0;
  }

  /* --- Search area -------------------------------------------------------- */
  .search-area {
    display: contents;
  }

  .search-area ::slotted(*) {
    width: 100%;
    max-width: 400px;
  }

  /* --- Tabs area ---------------------------------------------------------- */
  .tabs-area {
    display: flex;
    margin-top: var(--bl-spacing-xs);
    border-bottom: 1px solid var(--bl-color-neutral-200);
    margin-inline: calc(-1 * var(--bl-spacing-lg, 0px));
    padding-inline: var(--bl-spacing-lg, 0px);
  }

  .tabs-area ::slotted(*) {
    flex: none;
  }

  /* Hide tabs border when there are no tabs */
  .tabs-area:not(:has(*)) {
    display: none;
  }

  /* Fallback for browsers without :has() -- tabs area without content */
  .page-header:not(.page-header--banner) .tabs-area {
    margin-inline: 0;
    padding-inline: 0;
  }

  /* --- Responsive: Mobile-first ------------------------------------------- */

  /* Small screens (mobile) */
  @media (max-width: 639px) {
    .back-button {
      display: block;
    }

    .breadcrumb-area {
      display: none;
    }

    .header-row {
      flex-direction: column;
      gap: var(--bl-spacing-md);
    }

    .actions {
      width: 100%;
      flex-wrap: wrap;
    }

    .page-header--banner .header-inner {
      padding-inline: var(--bl-spacing-md);
      padding-top: 60px;
    }

    .banner-bg {
      height: 120px;
    }

    .title ::slotted(*) {
      font-size: var(--bl-font-size-lg);
    }

    .tabs-area {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .tabs-area::-webkit-scrollbar {
      display: none;
    }
  }

  /* Medium screens (tablet) */
  @media (min-width: 640px) and (max-width: 1023px) {
    .back-button {
      display: none;
    }

    .breadcrumb-area {
      display: contents;
    }
  }

  /* Large screens (desktop) */
  @media (min-width: 1024px) {
    .back-button {
      display: none;
    }

    .breadcrumb-area {
      display: contents;
    }

    .page-header--banner .header-inner {
      padding-inline: var(--bl-spacing-xl);
    }

    .banner-bg {
      height: 180px;
    }
  }
`;

/* --------------------------------------------------------------------------
 * Breadcrumb Styles
 * -------------------------------------------------------------------------- */
export const breadcrumbStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  nav {
    display: block;
  }

  ol {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--bl-spacing-xs);
    flex-wrap: wrap;
  }

  /* Ellipsis item styling */
  ::slotted([data-breadcrumb-ellipsis]) {
    color: var(--bl-color-neutral-400);
    font-size: var(--bl-font-size-sm);
    user-select: none;
    pointer-events: none;
  }
`;

/* --------------------------------------------------------------------------
 * Breadcrumb Item Styles
 * -------------------------------------------------------------------------- */
export const breadcrumbItemStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    font-size: var(--bl-font-size-sm);
    font-family: var(--bl-font-family-base);
  }

  :host(:not(:first-child))::before {
    content: '/';
    color: var(--bl-color-neutral-400);
    margin-right: var(--bl-spacing-xs);
  }

  a,
  ::slotted(a) {
    color: var(--bl-color-neutral-500);
    text-decoration: none;
    transition: color var(--bl-transition-fast);
  }

  a:hover,
  ::slotted(a:hover) {
    color: var(--bl-color-primary-600);
  }

  :host([current]) ::slotted(*),
  :host([current]) span {
    color: var(--bl-color-neutral-900);
    font-weight: 500;
  }

  ::slotted(*):focus-visible,
  a:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
    border-radius: var(--bl-radius-xs);
  }
`;

/* --------------------------------------------------------------------------
 * Page Header Avatar Styles
 * -------------------------------------------------------------------------- */
export const pageHeaderAvatarStyles = css`
  :host {
    display: inline-block;
    font-family: var(--bl-font-family-base);
  }

  .avatar-wrapper {
    position: relative;
    display: inline-flex;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--bl-color-neutral-100);
    border: 3px solid var(--bl-color-white, #ffffff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .fallback-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60%;
    color: var(--bl-color-neutral-400);
  }

  .fallback-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* --- Size variants ------------------------------------------------------ */
  :host([size='sm']) .avatar {
    width: 48px;
    height: 48px;
    border-width: 2px;
  }

  :host([size='md']) .avatar {
    width: 72px;
    height: 72px;
    border-width: 3px;
  }

  :host([size='lg']) .avatar {
    width: 96px;
    height: 96px;
    border-width: 4px;
  }

  /* --- Verified badge ----------------------------------------------------- */
  .verified-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bl-color-primary-500);
    background: var(--bl-color-white, #ffffff);
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .verified-badge svg {
    display: block;
  }

  :host([size='sm']) .verified-badge {
    width: 16px;
    height: 16px;
    bottom: 0;
    right: 0;
  }

  :host([size='sm']) .verified-badge svg {
    width: 16px;
    height: 16px;
  }

  :host([size='md']) .verified-badge {
    width: 22px;
    height: 22px;
    bottom: 1px;
    right: 1px;
  }

  :host([size='md']) .verified-badge svg {
    width: 22px;
    height: 22px;
  }

  :host([size='lg']) .verified-badge {
    width: 28px;
    height: 28px;
    bottom: 2px;
    right: 2px;
  }

  :host([size='lg']) .verified-badge svg {
    width: 28px;
    height: 28px;
  }

  /* --- Responsive avatar -------------------------------------------------- */
  @media (max-width: 639px) {
    :host([size='lg']) .avatar {
      width: 72px;
      height: 72px;
      border-width: 3px;
    }

    :host([size='lg']) .verified-badge {
      width: 22px;
      height: 22px;
      bottom: 1px;
      right: 1px;
    }

    :host([size='lg']) .verified-badge svg {
      width: 22px;
      height: 22px;
    }

    :host([size='md']) .avatar {
      width: 56px;
      height: 56px;
    }

    :host([size='md']) .verified-badge {
      width: 18px;
      height: 18px;
    }

    :host([size='md']) .verified-badge svg {
      width: 18px;
      height: 18px;
    }
  }
`;
