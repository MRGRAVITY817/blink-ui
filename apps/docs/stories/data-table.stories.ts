import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Data Table",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <bl-data-table>
      <bl-table-header>
        <bl-table-row>
          <bl-table-header-cell>Name</bl-table-header-cell>
          <bl-table-header-cell>Email</bl-table-header-cell>
          <bl-table-header-cell>Role</bl-table-header-cell>
          <bl-table-header-cell>Status</bl-table-header-cell>
        </bl-table-row>
      </bl-table-header>
      <bl-table-body>
        <bl-table-row>
          <bl-table-cell>Alice Johnson</bl-table-cell>
          <bl-table-cell>alice@example.com</bl-table-cell>
          <bl-table-cell>Admin</bl-table-cell>
          <bl-table-cell><bl-badge variant="success">Active</bl-badge></bl-table-cell>
        </bl-table-row>
        <bl-table-row>
          <bl-table-cell>Bob Smith</bl-table-cell>
          <bl-table-cell>bob@example.com</bl-table-cell>
          <bl-table-cell>Editor</bl-table-cell>
          <bl-table-cell><bl-badge variant="success">Active</bl-badge></bl-table-cell>
        </bl-table-row>
        <bl-table-row>
          <bl-table-cell>Carol White</bl-table-cell>
          <bl-table-cell>carol@example.com</bl-table-cell>
          <bl-table-cell>Viewer</bl-table-cell>
          <bl-table-cell><bl-badge variant="secondary">Inactive</bl-badge></bl-table-cell>
        </bl-table-row>
      </bl-table-body>
    </bl-data-table>
  `,
};

export const Sortable: Story = {
  render: () => html`
    <bl-data-table @bl-sort-change=${(e: CustomEvent) => console.log('Sort:', e.detail)}>
      <bl-table-header>
        <bl-table-row>
          <bl-table-header-cell column="name" sortable sort-direction="ascending">Name</bl-table-header-cell>
          <bl-table-header-cell column="email" sortable>Email</bl-table-header-cell>
          <bl-table-header-cell column="role" sortable>Role</bl-table-header-cell>
        </bl-table-row>
      </bl-table-header>
      <bl-table-body>
        <bl-table-row>
          <bl-table-cell>Alice Johnson</bl-table-cell>
          <bl-table-cell>alice@example.com</bl-table-cell>
          <bl-table-cell>Admin</bl-table-cell>
        </bl-table-row>
        <bl-table-row>
          <bl-table-cell>Bob Smith</bl-table-cell>
          <bl-table-cell>bob@example.com</bl-table-cell>
          <bl-table-cell>Editor</bl-table-cell>
        </bl-table-row>
      </bl-table-body>
    </bl-data-table>
  `,
};

export const WithPagination: Story = {
  render: () => html`
    <bl-data-table>
      <bl-table-header>
        <bl-table-row>
          <bl-table-header-cell>ID</bl-table-header-cell>
          <bl-table-header-cell>Name</bl-table-header-cell>
          <bl-table-header-cell>Email</bl-table-header-cell>
        </bl-table-row>
      </bl-table-header>
      <bl-table-body>
        <bl-table-row><bl-table-cell>1</bl-table-cell><bl-table-cell>Alice</bl-table-cell><bl-table-cell>alice@example.com</bl-table-cell></bl-table-row>
        <bl-table-row><bl-table-cell>2</bl-table-cell><bl-table-cell>Bob</bl-table-cell><bl-table-cell>bob@example.com</bl-table-cell></bl-table-row>
        <bl-table-row><bl-table-cell>3</bl-table-cell><bl-table-cell>Carol</bl-table-cell><bl-table-cell>carol@example.com</bl-table-cell></bl-table-row>
      </bl-table-body>
    </bl-data-table>
    <bl-table-pagination page="1" total-pages="5" total-rows="50" page-size="10"></bl-table-pagination>
  `,
};
