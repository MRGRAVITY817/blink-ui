import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
  args: {
    orientation: "vertical",
    disabled: false,
    value: "red",
  },
  render: (args) => html`
    <bl-radio-group
      name="color"
      value=${args.value}
      orientation=${args.orientation}
      ?disabled=${args.disabled}
    >
      <bl-radio value="red">Red</bl-radio>
      <bl-radio value="green">Green</bl-radio>
      <bl-radio value="blue">Blue</bl-radio>
    </bl-radio-group>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const PlanSelection: Story = {
  render: () => html`
    <bl-radio-group name="plan" value="pro">
      <bl-radio value="free">Free</bl-radio>
      <bl-radio value="pro">Pro</bl-radio>
      <bl-radio value="enterprise">Enterprise</bl-radio>
    </bl-radio-group>
  `,
};
