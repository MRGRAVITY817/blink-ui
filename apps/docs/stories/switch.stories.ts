import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Switch",
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    label: { control: "text" },
  },
  args: {
    checked: false,
    disabled: false,
    size: "md",
    label: "Enable notifications",
  },
  render: (args) => html`
    <bl-switch
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      size=${args.size}
    >${args.label}</bl-switch>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: "sm", label: "Small switch" },
};

export const SettingsPanel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <bl-switch checked>Dark mode</bl-switch>
      <bl-switch>Email notifications</bl-switch>
      <bl-switch checked>Auto-save</bl-switch>
      <bl-switch disabled>Experimental features</bl-switch>
    </div>
  `,
};
