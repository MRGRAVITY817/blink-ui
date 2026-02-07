import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { toast } from "@blink-ui/components";

const meta: Meta = {
  title: "Components/Toast",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
    message: { control: "text" },
    duration: { control: "number" },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  args: {
    variant: "default",
    message: "This is a toast notification.",
    duration: 5000,
    position: "top-right",
  },
  render: (args) => html`
    <bl-toast-region position=${args.position}></bl-toast-region>
    <bl-button
      @click=${() => toast(args.message, { variant: args.variant, duration: args.duration })}
    >Show Toast</bl-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Success: Story = {
  args: { variant: "success", message: "File saved successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", message: "Your session will expire in 5 minutes." },
};

export const Danger: Story = {
  args: { variant: "danger", message: "Failed to save changes." },
};

export const WithAction: Story = {
  render: () => html`
    <bl-toast-region position="top-right"></bl-toast-region>
    <bl-button
      @click=${() =>
        toast("Email archived.", {
          variant: "default",
          action: {
            label: "Undo",
            onClick: () => toast("Email restored.", { variant: "success" }),
          },
        })}
    >Archive Email</bl-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <bl-toast-region position="top-right"></bl-toast-region>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <bl-button
        @click=${() => toast("This is a default toast.")}
      >Default</bl-button>
      <bl-button
        @click=${() => toast("Operation completed!", { variant: "success" })}
      >Success</bl-button>
      <bl-button
        @click=${() => toast("Check your settings.", { variant: "warning" })}
      >Warning</bl-button>
      <bl-button
        @click=${() => toast("Something went wrong.", { variant: "danger" })}
      >Danger</bl-button>
    </div>
  `,
};

export const LongDuration: Story = {
  args: { duration: 10000, message: "This toast stays for 10 seconds." },
};

export const Persistent: Story = {
  render: () => html`
    <bl-toast-region position="top-right"></bl-toast-region>
    <bl-button
      @click=${() =>
        toast("This toast won't auto-dismiss. Close it manually.", {
          variant: "warning",
          duration: 0,
        })}
    >Show Persistent Toast</bl-button>
  `,
};
