import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Page Header",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <bl-page-header>
      <h1>Dashboard</h1>
      <p slot="description">Overview of your project metrics and activity.</p>
      <bl-button slot="actions" variant="primary">Create New</bl-button>
    </bl-page-header>
  `,
};

export const WithBreadcrumb: Story = {
  render: () => html`
    <bl-page-header>
      <bl-breadcrumb slot="breadcrumb">
        <bl-breadcrumb-item><a href="#">Home</a></bl-breadcrumb-item>
        <bl-breadcrumb-item><a href="#">Projects</a></bl-breadcrumb-item>
        <bl-breadcrumb-item><span>Settings</span></bl-breadcrumb-item>
      </bl-breadcrumb>
      <h1>Project Settings</h1>
      <p slot="description">Manage your project configuration and preferences.</p>
      <bl-button slot="actions">Save Changes</bl-button>
    </bl-page-header>
  `,
};

export const MultipleActions: Story = {
  render: () => html`
    <bl-page-header>
      <h1>Team Members</h1>
      <p slot="description">Manage team access and permissions.</p>
      <bl-button slot="actions" variant="outline">Export</bl-button>
      <bl-button slot="actions" variant="primary">Invite Member</bl-button>
    </bl-page-header>
  `,
};

export const BreadcrumbOnly: Story = {
  render: () => html`
    <bl-breadcrumb>
      <bl-breadcrumb-item><a href="#">Home</a></bl-breadcrumb-item>
      <bl-breadcrumb-item><a href="#">Products</a></bl-breadcrumb-item>
      <bl-breadcrumb-item><a href="#">Electronics</a></bl-breadcrumb-item>
      <bl-breadcrumb-item><span>Smartphones</span></bl-breadcrumb-item>
    </bl-breadcrumb>
  `,
};
