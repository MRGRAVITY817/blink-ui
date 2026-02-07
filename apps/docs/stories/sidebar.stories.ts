import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="height: 500px; display: flex; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <bl-sidebar>
        <bl-sidebar-header>
          <strong>Blink UI</strong>
        </bl-sidebar-header>
        <bl-sidebar-content>
          <bl-sidebar-group>
            <bl-sidebar-group-label slot="label">Main</bl-sidebar-group-label>
            <bl-sidebar-menu>
              <bl-sidebar-menu-item active>Dashboard</bl-sidebar-menu-item>
              <bl-sidebar-menu-item>Analytics</bl-sidebar-menu-item>
              <bl-sidebar-menu-item>Projects</bl-sidebar-menu-item>
              <bl-sidebar-menu-item>Tasks</bl-sidebar-menu-item>
            </bl-sidebar-menu>
          </bl-sidebar-group>
          <bl-sidebar-group>
            <bl-sidebar-group-label slot="label">Settings</bl-sidebar-group-label>
            <bl-sidebar-menu>
              <bl-sidebar-menu-item>General</bl-sidebar-menu-item>
              <bl-sidebar-menu-item>Team</bl-sidebar-menu-item>
              <bl-sidebar-menu-item>Billing</bl-sidebar-menu-item>
            </bl-sidebar-menu>
          </bl-sidebar-group>
        </bl-sidebar-content>
        <bl-sidebar-footer>
          <span style="font-size: 0.75rem; color: #94a3b8;">v0.5.0</span>
        </bl-sidebar-footer>
      </bl-sidebar>
      <div style="flex: 1; padding: 1.5rem;">
        <h2 style="margin: 0;">Main Content Area</h2>
        <p style="color: #64748b;">The sidebar sits beside the main content.</p>
      </div>
    </div>
  `,
};

export const WithLinks: Story = {
  render: () => html`
    <div style="height: 400px; display: flex; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <bl-sidebar>
        <bl-sidebar-content>
          <bl-sidebar-menu>
            <bl-sidebar-menu-item href="#dashboard" active>Dashboard</bl-sidebar-menu-item>
            <bl-sidebar-menu-item href="#users">Users</bl-sidebar-menu-item>
            <bl-sidebar-menu-item href="#reports">Reports</bl-sidebar-menu-item>
            <bl-sidebar-menu-item href="#settings">Settings</bl-sidebar-menu-item>
          </bl-sidebar-menu>
        </bl-sidebar-content>
      </bl-sidebar>
      <div style="flex: 1; padding: 1.5rem;">Content area</div>
    </div>
  `,
};
