import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Select",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    value: { control: "text" },
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
  },
  args: {
    placeholder: "Select a fruit",
    size: "md",
    disabled: false,
    value: "",
    placement: "bottom-start",
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <bl-select
        placeholder=${args.placeholder}
        size=${args.size}
        ?disabled=${args.disabled}
        value=${args.value}
        placement=${args.placement}
      >
        <bl-option value="apple">Apple</bl-option>
        <bl-option value="banana">Banana</bl-option>
        <bl-option value="cherry">Cherry</bl-option>
        <bl-option value="mango">Mango</bl-option>
        <bl-option value="orange">Orange</bl-option>
      </bl-select>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: "cherry" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "banana" },
};

export const WithGroups: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-select placeholder="Choose a color">
        <bl-option-group label="Warm">
          <bl-option value="red">Red</bl-option>
          <bl-option value="orange">Orange</bl-option>
          <bl-option value="yellow">Yellow</bl-option>
        </bl-option-group>
        <bl-option-group label="Cool">
          <bl-option value="green">Green</bl-option>
          <bl-option value="blue">Blue</bl-option>
          <bl-option value="purple">Purple</bl-option>
        </bl-option-group>
      </bl-select>
    </div>
  `,
};

export const WithDisabledOptions: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-select placeholder="Select a plan">
        <bl-option value="free">Free</bl-option>
        <bl-option value="starter">Starter</bl-option>
        <bl-option value="pro">Pro</bl-option>
        <bl-option value="enterprise" disabled>Enterprise (contact sales)</bl-option>
      </bl-select>
    </div>
  `,
};

export const CountryPicker: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-select placeholder="Select country" value="us">
        <bl-option value="us">United States</bl-option>
        <bl-option value="uk">United Kingdom</bl-option>
        <bl-option value="ca">Canada</bl-option>
        <bl-option value="au">Australia</bl-option>
        <bl-option value="de">Germany</bl-option>
        <bl-option value="fr">France</bl-option>
        <bl-option value="jp">Japan</bl-option>
      </bl-select>
    </div>
  `,
};
