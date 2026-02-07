import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "elevated"],
    },
  },
  args: {
    variant: "outlined",
  },
  render: (args) => html`
    <bl-card variant=${args.variant}>
      <p>This is a card with some content inside.</p>
    </bl-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Elevated: Story = {
  args: { variant: "elevated" },
};

export const WithHeaderAndFooter: Story = {
  render: () => html`
    <bl-card variant="outlined">
      <div slot="header">Card Header</div>
      <p>This is the main content of the card. It can contain any HTML elements or other components.</p>
      <div slot="footer">Card Footer</div>
    </bl-card>
  `,
};

export const SimpleContent: Story = {
  render: () => html`
    <bl-card variant="outlined">
      <p>A simple card with just text content and no header or footer slots.</p>
    </bl-card>
  `,
};
