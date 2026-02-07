import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Command",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Inline: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <bl-command>
        <bl-command-input placeholder="Type a command or search..."></bl-command-input>
        <bl-command-list>
          <bl-command-group heading="Suggestions">
            <bl-command-item value="calendar">Calendar</bl-command-item>
            <bl-command-item value="search">Search Emoji</bl-command-item>
            <bl-command-item value="calculator">Calculator</bl-command-item>
          </bl-command-group>
          <bl-command-separator></bl-command-separator>
          <bl-command-group heading="Settings">
            <bl-command-item value="profile">Profile</bl-command-item>
            <bl-command-item value="billing">Billing</bl-command-item>
            <bl-command-item value="settings">Settings</bl-command-item>
          </bl-command-group>
        </bl-command-list>
      </bl-command>
    </div>
  `,
};

export const Dialog: Story = {
  render: () => html`
    <div>
      <p>Press <kbd>Ctrl+K</kbd> / <kbd>⌘K</kbd> to open the command palette.</p>
      <bl-command-dialog>
        <bl-command>
          <bl-command-input></bl-command-input>
          <bl-command-list>
            <bl-command-group heading="Actions">
              <bl-command-item value="new-file">New File</bl-command-item>
              <bl-command-item value="new-folder">New Folder</bl-command-item>
              <bl-command-item value="open">Open File</bl-command-item>
            </bl-command-group>
            <bl-command-separator></bl-command-separator>
            <bl-command-group heading="Navigation">
              <bl-command-item value="dashboard">Go to Dashboard</bl-command-item>
              <bl-command-item value="settings">Go to Settings</bl-command-item>
            </bl-command-group>
            <bl-command-empty>No results found.</bl-command-empty>
          </bl-command-list>
        </bl-command>
      </bl-command-dialog>
    </div>
  `,
};

export const WithShortcuts: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <bl-command>
        <bl-command-input></bl-command-input>
        <bl-command-list>
          <bl-command-item value="new">
            New File
            <bl-command-shortcut slot="shortcut"><kbd>⌘</kbd><kbd>N</kbd></bl-command-shortcut>
          </bl-command-item>
          <bl-command-item value="save">
            Save
            <bl-command-shortcut slot="shortcut"><kbd>⌘</kbd><kbd>S</kbd></bl-command-shortcut>
          </bl-command-item>
          <bl-command-item value="find">
            Find
            <bl-command-shortcut slot="shortcut"><kbd>⌘</kbd><kbd>F</kbd></bl-command-shortcut>
          </bl-command-item>
        </bl-command-list>
      </bl-command>
    </div>
  `,
};
