import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/Separator",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
  args: {
    orientation: "horizontal",
    decorative: false,
  },
  render: (args) => html`
    <bl-separator
      orientation=${args.orientation}
      ?decorative=${args.decorative}
    ></bl-separator>
  `,
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {};

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; height: 40px;">
      <span>Left</span>
      <bl-separator orientation="vertical"></bl-separator>
      <span>Right</span>
    </div>
  `,
};

export const Decorative: Story = {
  args: { decorative: true },
};

export const InContent: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <p>First section of content.</p>
      <bl-separator></bl-separator>
      <p>Second section of content.</p>
      <bl-separator></bl-separator>
      <p>Third section of content.</p>
    </div>
  `,
};
