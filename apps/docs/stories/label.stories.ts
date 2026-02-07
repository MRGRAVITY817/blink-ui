import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/Label",
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    text: { control: "text" },
  },
  args: {
    required: false,
    text: "Email address",
  },
  render: (args) => html`
    <bl-label ?required=${args.required}>${args.text}</bl-label>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithInput: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <bl-label required>Username</bl-label>
      <bl-input placeholder="Enter your username"></bl-input>
    </div>
  `,
};
