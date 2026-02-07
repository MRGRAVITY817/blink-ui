import { css } from 'lit';

export const tabsStyles = css`
  :host {
    display: block;
  }

  .tablist {
    display: flex;
    border-bottom: 1px solid var(--bl-color-neutral-200);
    gap: 0;
  }

  :host([orientation='vertical']) .tablist {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid var(--bl-color-neutral-200);
  }
`;
