import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    closable: { control: "boolean" },
    message: { control: "text" },
  },
  args: {
    variant: "info",
    closable: false,
    message: "This is an alert message.",
  },
  render: (args) => html`
    <bl-alert
      variant=${args.variant}
      ?closable=${args.closable}
    >${args.message}</bl-alert>
  `,
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: { variant: "info", message: "This is an informational alert." },
};

export const Success: Story = {
  args: { variant: "success", message: "Operation completed successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", message: "Please review before proceeding." },
};

export const Danger: Story = {
  args: { variant: "danger", message: "An error has occurred." },
};

export const Closable: Story = {
  args: {
    variant: "info",
    closable: true,
    message: "This alert can be dismissed.",
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <bl-alert variant="info">This is an informational alert.</bl-alert>
      <bl-alert variant="success">Operation completed successfully.</bl-alert>
      <bl-alert variant="warning">Please review before proceeding.</bl-alert>
      <bl-alert variant="danger">An error has occurred.</bl-alert>
    </div>
  `,
};
