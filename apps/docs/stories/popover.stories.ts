import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right", "bottom-start", "bottom-end"],
    },
    modal: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    closeOnClickOutside: { control: "boolean" },
    offset: { control: "number" },
  },
  args: {
    placement: "bottom",
    modal: false,
    closeOnEscape: true,
    closeOnClickOutside: true,
    offset: 8,
  },
  render: (args) => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <bl-popover
        placement=${args.placement}
        ?modal=${args.modal}
        ?close-on-escape=${args.closeOnEscape}
        ?close-on-click-outside=${args.closeOnClickOutside}
        offset=${args.offset}
      >
        <bl-button slot="trigger">Open Popover</bl-button>
        <div>
          <p style="margin: 0 0 8px;">This is popover content.</p>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Click outside or press Escape to close.</p>
        </div>
      </bl-popover>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const TopPlacement: Story = {
  args: { placement: "top" },
};

export const Modal: Story = {
  args: { modal: true },
  render: (args) => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <bl-popover
        placement=${args.placement}
        ?modal=${args.modal}
      >
        <bl-button slot="trigger">Open Modal Popover</bl-button>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Modal Popover</p>
          <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;">Focus is trapped within this popover.</p>
          <bl-button size="sm">Focusable button</bl-button>
        </div>
      </bl-popover>
    </div>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <bl-popover placement="bottom-start">
        <bl-button slot="trigger">Edit Settings</bl-button>
        <div style="min-width: 240px;">
          <p style="margin: 0 0 12px; font-weight: 600;">Settings</p>
          <bl-input label="Name" placeholder="Enter name"></bl-input>
          <div style="margin-top: 12px; display: flex; gap: 8px; justify-content: flex-end;">
            <bl-button variant="ghost" size="sm">Cancel</bl-button>
            <bl-button size="sm">Save</bl-button>
          </div>
        </div>
      </bl-popover>
    </div>
  `,
};
