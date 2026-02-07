import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/Skeleton",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circle", "rect"],
    },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: {
    variant: "rect",
    width: "200px",
    height: "1rem",
  },
  render: (args) => html`
    <bl-skeleton
      variant=${args.variant}
      width=${args.width}
      height=${args.height}
    ></bl-skeleton>
  `,
};

export default meta;
type Story = StoryObj;

export const Text: Story = {
  args: { variant: "text", width: "200px", height: "1rem" },
};

export const Circle: Story = {
  render: () => html`<bl-skeleton variant="circle" size="48px"></bl-skeleton>`,
};

export const Rect: Story = {
  args: { variant: "rect", width: "300px", height: "120px" },
};

export const CardPlaceholder: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
      <bl-skeleton variant="rect" width="100%" height="160px"></bl-skeleton>
      <bl-skeleton variant="text" width="80%"></bl-skeleton>
      <bl-skeleton variant="text" width="60%"></bl-skeleton>
      <div style="display: flex; gap: 8px; align-items: center;">
        <bl-skeleton variant="circle" size="32px"></bl-skeleton>
        <bl-skeleton variant="text" width="100px"></bl-skeleton>
      </div>
    </div>
  `,
};
