import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/ContextMenu",
  tags: ["autodocs"],
  render: () => html`
    <bl-context-menu>
      <div
        slot="target"
        style="
          padding: 48px;
          border: 2px dashed var(--bl-color-neutral-300, #cbd5e1);
          border-radius: 8px;
          text-align: center;
          color: var(--bl-color-neutral-500, #64748b);
          font-family: var(--bl-font-family-base, sans-serif);
          font-size: 14px;
          user-select: none;
        "
      >
        Right-click anywhere in this area
      </div>
      <bl-menu>
        <bl-menu-item value="cut">Cut</bl-menu-item>
        <bl-menu-item value="copy">Copy</bl-menu-item>
        <bl-menu-item value="paste">Paste</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="select-all">Select All</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="delete" variant="danger">Delete</bl-menu-item>
      </bl-menu>
    </bl-context-menu>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const FileExplorer: Story = {
  render: () => html`
    <bl-context-menu>
      <div
        slot="target"
        style="
          padding: 48px;
          border: 2px dashed var(--bl-color-neutral-300, #cbd5e1);
          border-radius: 8px;
          text-align: center;
          color: var(--bl-color-neutral-500, #64748b);
          font-family: var(--bl-font-family-base, sans-serif);
          font-size: 14px;
          user-select: none;
        "
      >
        Right-click for file options
      </div>
      <bl-menu>
        <bl-menu-group-label>File</bl-menu-group-label>
        <bl-menu-item value="new-file">New File</bl-menu-item>
        <bl-menu-item value="new-folder">New Folder</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-group-label>Actions</bl-menu-group-label>
        <bl-menu-item value="rename">Rename</bl-menu-item>
        <bl-menu-item value="move">Move to...</bl-menu-item>
        <bl-menu-item value="download">Download</bl-menu-item>
        <bl-menu-separator></bl-menu-separator>
        <bl-menu-item value="delete" variant="danger">Delete</bl-menu-item>
      </bl-menu>
    </bl-context-menu>
  `,
};
