import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
  args: {
    type: "single",
    orientation: "horizontal",
    size: "md",
    variant: "outline",
    disabled: false,
    value: "center",
  },
  render: (args) => html`
    <bl-toggle-group
      type=${args.type}
      orientation=${args.orientation}
      size=${args.size}
      variant=${args.variant}
      ?disabled=${args.disabled}
      value=${args.value}
    >
      <bl-toggle value="left">Left</bl-toggle>
      <bl-toggle value="center">Center</bl-toggle>
      <bl-toggle value="right">Right</bl-toggle>
    </bl-toggle-group>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Multiple: Story = {
  args: { type: "multiple", value: "bold,italic" },
  render: (args) => html`
    <bl-toggle-group
      type=${args.type}
      size=${args.size}
      variant=${args.variant}
      value=${args.value}
    >
      <bl-toggle value="bold">B</bl-toggle>
      <bl-toggle value="italic">I</bl-toggle>
      <bl-toggle value="underline">U</bl-toggle>
      <bl-toggle value="strikethrough">S</bl-toggle>
    </bl-toggle-group>
  `,
};

export const Vertical: Story = {
  args: { orientation: "vertical", value: "list" },
  render: (args) => html`
    <bl-toggle-group
      type="single"
      orientation=${args.orientation}
      variant="outline"
      value=${args.value}
    >
      <bl-toggle value="grid">Grid</bl-toggle>
      <bl-toggle value="list">List</bl-toggle>
      <bl-toggle value="table">Table</bl-toggle>
    </bl-toggle-group>
  `,
};

export const Small: Story = {
  args: { size: "sm", value: "center" },
};

export const Large: Story = {
  args: { size: "lg", value: "center" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "center" },
};
