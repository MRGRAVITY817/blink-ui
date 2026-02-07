import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Badge",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    label: { control: "text" },
  },
  args: {
    variant: "neutral",
    size: "md",
    label: "Badge",
  },
  render: (args) => html`
    <bl-badge
      variant=${args.variant}
      size=${args.size}
    >${args.label}</bl-badge>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary", label: "Primary" },
};

export const Success: Story = {
  args: { variant: "success", label: "Success" },
};

export const Warning: Story = {
  args: { variant: "warning", label: "Warning" },
};

export const Danger: Story = {
  args: { variant: "danger", label: "Danger" },
};

export const Small: Story = {
  args: { size: "sm", label: "Small" },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <bl-badge variant="primary">Primary</bl-badge>
      <bl-badge variant="secondary">Secondary</bl-badge>
      <bl-badge variant="success">Success</bl-badge>
      <bl-badge variant="warning">Warning</bl-badge>
      <bl-badge variant="danger">Danger</bl-badge>
      <bl-badge variant="neutral">Neutral</bl-badge>
    </div>
  `,
};
