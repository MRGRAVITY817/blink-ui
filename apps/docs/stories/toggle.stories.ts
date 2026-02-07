import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  argTypes: {
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
  },
  args: {
    pressed: false,
    disabled: false,
    variant: "default",
    size: "md",
    label: "Bold",
  },
  render: (args) => html`
    <bl-toggle
      ?pressed=${args.pressed}
      ?disabled=${args.disabled}
      variant=${args.variant}
      size=${args.size}
    >${args.label}</bl-toggle>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Pressed: Story = {
  args: { pressed: true },
};

export const Outline: Story = {
  args: { variant: "outline", label: "Italic" },
};

export const OutlinePressed: Story = {
  args: { variant: "outline", pressed: true, label: "Italic" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TextFormatting: Story = {
  render: () => html`
    <div style="display: flex; gap: 4px;">
      <bl-toggle variant="outline" size="sm" pressed>B</bl-toggle>
      <bl-toggle variant="outline" size="sm">I</bl-toggle>
      <bl-toggle variant="outline" size="sm">U</bl-toggle>
    </div>
  `,
};
