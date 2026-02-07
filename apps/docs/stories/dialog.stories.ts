import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    closeOnEscape: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    preventClose: { control: "boolean" },
  },
  args: {
    label: "Dialog Title",
    closeOnEscape: true,
    closeOnOverlayClick: true,
    preventClose: false,
  },
  render: (args) => html`
    <bl-button
      @click=${(e: Event) => {
        const dialog = (e.target as HTMLElement).nextElementSibling;
        if (dialog) (dialog as any).open = true;
      }}
    >Open Dialog</bl-button>
    <bl-dialog
      label=${args.label}
      ?close-on-escape=${args.closeOnEscape}
      ?close-on-overlay-click=${args.closeOnOverlayClick}
      ?prevent-close=${args.preventClose}
    >
      <h3 slot="header">${args.label}</h3>
      <p>This is the dialog body content. You can put any content here, including forms, text, or other components.</p>
      <div slot="footer">
        <bl-button
          variant="ghost"
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Cancel</bl-button>
        <bl-button
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Confirm</bl-button>
      </div>
    </bl-dialog>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const PreventClose: Story = {
  args: { preventClose: true, label: "Required Action" },
  render: (args) => html`
    <bl-button
      @click=${(e: Event) => {
        const dialog = (e.target as HTMLElement).nextElementSibling;
        if (dialog) (dialog as any).open = true;
      }}
    >Open Non-Dismissible Dialog</bl-button>
    <bl-dialog
      label=${args.label}
      ?prevent-close=${args.preventClose}
    >
      <h3 slot="header">${args.label}</h3>
      <p>This dialog cannot be dismissed by clicking outside or pressing Escape. You must use the button below.</p>
      <div slot="footer">
        <bl-button
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >I understand</bl-button>
      </div>
    </bl-dialog>
  `,
};

export const ConfirmDelete: Story = {
  render: () => html`
    <bl-button
      variant="danger"
      @click=${(e: Event) => {
        const dialog = (e.target as HTMLElement).nextElementSibling;
        if (dialog) (dialog as any).open = true;
      }}
    >Delete Item</bl-button>
    <bl-dialog label="Confirm deletion">
      <h3 slot="header">Delete Item?</h3>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      <div slot="footer">
        <bl-button
          variant="ghost"
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Cancel</bl-button>
        <bl-button
          variant="danger"
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Delete</bl-button>
      </div>
    </bl-dialog>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <bl-button
      @click=${(e: Event) => {
        const dialog = (e.target as HTMLElement).nextElementSibling;
        if (dialog) (dialog as any).open = true;
      }}
    >Create New Item</bl-button>
    <bl-dialog label="Create item">
      <h3 slot="header">Create New Item</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <bl-input label="Name" placeholder="Enter item name"></bl-input>
        <bl-input label="Description" placeholder="Enter description"></bl-input>
      </div>
      <div slot="footer">
        <bl-button
          variant="ghost"
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Cancel</bl-button>
        <bl-button
          size="sm"
          @click=${(e: Event) => {
            const dialog = (e.target as HTMLElement).closest('bl-dialog');
            if (dialog) (dialog as any).open = false;
          }}
        >Create</bl-button>
      </div>
    </bl-dialog>
  `,
};
