import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    label: "Button",
  },
  render: (args) => html`
    <bl-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    >${args.label}</bl-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Danger: Story = {
  args: { variant: "danger", label: "Danger" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
};

export const Small: Story = {
  args: { size: "sm", label: "Small" },
};

export const Large: Story = {
  args: { size: "lg", label: "Large" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <bl-button variant="primary">Primary</bl-button>
      <bl-button variant="secondary">Secondary</bl-button>
      <bl-button variant="danger">Danger</bl-button>
      <bl-button variant="ghost">Ghost</bl-button>
    </div>
  `,
};
