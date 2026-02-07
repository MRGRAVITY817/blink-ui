import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    filter: { control: "select", options: ["includes", "startsWith", "none"] },
  },
  args: {
    placeholder: "Search frameworks...",
    size: "md",
    disabled: false,
    filter: "includes",
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <bl-combobox
        placeholder=${args.placeholder}
        size=${args.size}
        filter=${args.filter}
        ?disabled=${args.disabled}
      >
        <bl-combobox-item value="react">React</bl-combobox-item>
        <bl-combobox-item value="vue">Vue</bl-combobox-item>
        <bl-combobox-item value="angular">Angular</bl-combobox-item>
        <bl-combobox-item value="svelte">Svelte</bl-combobox-item>
        <bl-combobox-item value="lit">Lit</bl-combobox-item>
        <bl-combobox-item value="solid">Solid</bl-combobox-item>
      </bl-combobox>
    </div>
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

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithGroups: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-combobox placeholder="Pick a language...">
        <bl-combobox-group label="Frontend">
          <bl-combobox-item value="js">JavaScript</bl-combobox-item>
          <bl-combobox-item value="ts">TypeScript</bl-combobox-item>
        </bl-combobox-group>
        <bl-combobox-group label="Backend">
          <bl-combobox-item value="python">Python</bl-combobox-item>
          <bl-combobox-item value="go">Go</bl-combobox-item>
          <bl-combobox-item value="rust">Rust</bl-combobox-item>
        </bl-combobox-group>
      </bl-combobox>
    </div>
  `,
};

export const StartsWithFilter: Story = {
  args: { filter: "startsWith", placeholder: "Type to filter (startsWith)..." },
};
