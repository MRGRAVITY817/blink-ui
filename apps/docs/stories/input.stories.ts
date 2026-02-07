import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helpText: { control: "text" },
  },
  args: {
    size: "md",
    disabled: false,
    error: false,
    label: "",
    placeholder: "Enter text...",
    helpText: "",
  },
  render: (args) => html`
    <bl-input
      size=${args.size}
      ?disabled=${args.disabled}
      ?error=${args.error}
      label=${args.label}
      placeholder=${args.placeholder}
      help-text=${args.helpText}
    ></bl-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Email Address", placeholder: "you@example.com" },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    helpText: "Must be at least 8 characters",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    error: true,
    helpText: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot type here",
    disabled: true,
  },
};

export const Small: Story = {
  args: { size: "sm", label: "Small Input", placeholder: "Small" },
};

export const Large: Story = {
  args: { size: "lg", label: "Large Input", placeholder: "Large" },
};
