import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Primitives/Avatar",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
  },
  args: {
    size: "md",
    src: "",
    alt: "",
    initials: "JD",
  },
  render: (args) => html`
    <bl-avatar
      size=${args.size}
      src=${args.src}
      alt=${args.alt}
      initials=${args.initials}
    ></bl-avatar>
  `,
};

export default meta;
type Story = StoryObj;

export const WithInitials: Story = {
  args: { initials: "JD" },
};

export const FallbackIcon: Story = {
  args: { initials: "", src: "" },
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <bl-avatar size="sm" initials="SM"></bl-avatar>
      <bl-avatar size="md" initials="MD"></bl-avatar>
      <bl-avatar size="lg" initials="LG"></bl-avatar>
    </div>
  `,
};
