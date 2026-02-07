import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    showDelay: { control: "number" },
    hideDelay: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    content: "This is a tooltip",
    placement: "top",
    showDelay: 700,
    hideDelay: 300,
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <bl-tooltip
        content=${args.content}
        placement=${args.placement}
        show-delay=${args.showDelay}
        hide-delay=${args.hideDelay}
        ?disabled=${args.disabled}
      >
        <bl-button>Hover me</bl-button>
      </bl-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bottom: Story = {
  args: { placement: "bottom", content: "Tooltip on bottom" },
};

export const Left: Story = {
  args: { placement: "left", content: "Tooltip on left" },
};

export const Right: Story = {
  args: { placement: "right", content: "Tooltip on right" },
};

export const NoDelay: Story = {
  args: { showDelay: 0, content: "Instant tooltip" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllPlacements: Story = {
  render: () => html`
    <div style="padding: 80px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <bl-tooltip content="Top" placement="top">
        <bl-button>Top</bl-button>
      </bl-tooltip>
      <bl-tooltip content="Bottom" placement="bottom">
        <bl-button>Bottom</bl-button>
      </bl-tooltip>
      <bl-tooltip content="Left" placement="left">
        <bl-button>Left</bl-button>
      </bl-tooltip>
      <bl-tooltip content="Right" placement="right">
        <bl-button>Right</bl-button>
      </bl-tooltip>
    </div>
  `,
};
