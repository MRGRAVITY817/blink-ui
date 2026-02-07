import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    label: { control: "text" },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: "md",
    label: "Remember me",
  },
  render: (args) => html`
    <bl-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      size=${args.size}
    >${args.label}</bl-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: "sm", label: "Small checkbox" },
};

export const CheckboxGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <bl-checkbox indeterminate>Select all</bl-checkbox>
      <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
        <bl-checkbox checked>Option A</bl-checkbox>
        <bl-checkbox>Option B</bl-checkbox>
        <bl-checkbox checked>Option C</bl-checkbox>
      </div>
    </div>
  `,
};
