import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Menu",
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
  },
  args: {
    placement: "bottom-start",
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <bl-menu placement=${args.placement}>
        <bl-button slot="trigger">Open Menu</bl-button>
        <bl-menu-item value="edit">Edit</bl-menu-item>
        <bl-menu-item value="duplicate">Duplicate</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="archive">Archive</bl-menu-item>
        <bl-menu-item value="delete" variant="danger">Delete</bl-menu-item>
      </bl-menu>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithGroups: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-menu placement="bottom-start">
        <bl-button slot="trigger">Actions</bl-button>
        <bl-menu-group-label>Edit</bl-menu-group-label>
        <bl-menu-item value="cut">Cut</bl-menu-item>
        <bl-menu-item value="copy">Copy</bl-menu-item>
        <bl-menu-item value="paste">Paste</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-group-label>View</bl-menu-group-label>
        <bl-menu-item value="zoom-in">Zoom In</bl-menu-item>
        <bl-menu-item value="zoom-out">Zoom Out</bl-menu-item>
        <bl-menu-item value="reset">Reset Zoom</bl-menu-item>
      </bl-menu>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-menu placement="bottom-start">
        <bl-button slot="trigger">File</bl-button>
        <bl-menu-item value="new">New File</bl-menu-item>
        <bl-menu-item value="open">Open...</bl-menu-item>
        <bl-menu-item value="save">Save</bl-menu-item>
        <bl-menu-item value="save-as" disabled>Save As... (disabled)</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="close">Close</bl-menu-item>
      </bl-menu>
    </div>
  `,
};

export const DangerItem: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-menu placement="bottom-start">
        <bl-button slot="trigger">Manage</bl-button>
        <bl-menu-item value="settings">Settings</bl-menu-item>
        <bl-menu-item value="export">Export Data</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="delete-account" variant="danger">Delete Account</bl-menu-item>
      </bl-menu>
    </div>
  `,
};

export const UserMenu: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-menu placement="bottom-end">
        <bl-button variant="ghost" slot="trigger">John Doe</bl-button>
        <bl-menu-group-label>My Account</bl-menu-group-label>
        <bl-menu-item value="profile">Profile</bl-menu-item>
        <bl-menu-item value="settings">Settings</bl-menu-item>
        <bl-menu-item value="billing">Billing</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="help">Help & Support</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="logout" variant="danger">Log out</bl-menu-item>
      </bl-menu>
    </div>
  `,
};
