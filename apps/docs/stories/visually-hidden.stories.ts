import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/VisuallyHidden",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div>
      <p>The text below is visually hidden but readable by screen readers:</p>
      <bl-visually-hidden>This text is only visible to screen readers</bl-visually-hidden>
      <p>(Inspect the DOM to see the hidden element)</p>
    </div>
  `,
};

export const WithButton: Story = {
  render: () => html`
    <bl-button variant="ghost">
      <bl-icon style="font-size: 20px;">
        <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </bl-icon>
      <bl-visually-hidden>Open menu</bl-visually-hidden>
    </bl-button>
  `,
};
