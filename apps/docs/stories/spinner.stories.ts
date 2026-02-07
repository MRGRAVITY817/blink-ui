import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/Spinner",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
  },
  args: {
    size: "md",
    label: "Loading",
  },
  render: (args) => html`
    <bl-spinner size=${args.size} label=${args.label}></bl-spinner>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <bl-spinner size="sm"></bl-spinner>
      <bl-spinner size="md"></bl-spinner>
      <bl-spinner size="lg"></bl-spinner>
    </div>
  `,
};
