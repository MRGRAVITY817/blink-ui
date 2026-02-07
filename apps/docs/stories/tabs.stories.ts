import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    activation: {
      control: "select",
      options: ["automatic", "manual"],
    },
    value: { control: "text" },
  },
  args: {
    orientation: "horizontal",
    activation: "automatic",
    value: "tab1",
  },
  render: (args) => html`
    <bl-tabs
      value=${args.value}
      orientation=${args.orientation}
      activation=${args.activation}
    >
      <bl-tab slot="tab" value="tab1">Account</bl-tab>
      <bl-tab slot="tab" value="tab2">Security</bl-tab>
      <bl-tab slot="tab" value="tab3">Notifications</bl-tab>

      <bl-tab-panel value="tab1">
        <p>Manage your account settings, profile information, and preferences.</p>
      </bl-tab-panel>
      <bl-tab-panel value="tab2">
        <p>Update your password, enable two-factor authentication, and manage sessions.</p>
      </bl-tab-panel>
      <bl-tab-panel value="tab3">
        <p>Configure email notifications, push alerts, and digest frequency.</p>
      </bl-tab-panel>
    </bl-tabs>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const SecondTabActive: Story = {
  args: { value: "tab2" },
};

export const ManualActivation: Story = {
  args: { activation: "manual" },
};

export const WithDisabledTab: Story = {
  render: () => html`
    <bl-tabs value="general">
      <bl-tab slot="tab" value="general">General</bl-tab>
      <bl-tab slot="tab" value="billing" disabled>Billing</bl-tab>
      <bl-tab slot="tab" value="team">Team</bl-tab>

      <bl-tab-panel value="general">
        <p>General settings for your workspace.</p>
      </bl-tab-panel>
      <bl-tab-panel value="billing">
        <p>Billing information (disabled).</p>
      </bl-tab-panel>
      <bl-tab-panel value="team">
        <p>Manage team members and roles.</p>
      </bl-tab-panel>
    </bl-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <bl-tabs value="overview">
      <bl-tab slot="tab" value="overview">Overview</bl-tab>
      <bl-tab slot="tab" value="analytics">Analytics</bl-tab>
      <bl-tab slot="tab" value="reports">Reports</bl-tab>
      <bl-tab slot="tab" value="exports">Exports</bl-tab>
      <bl-tab slot="tab" value="settings">Settings</bl-tab>

      <bl-tab-panel value="overview"><p>Dashboard overview with key metrics.</p></bl-tab-panel>
      <bl-tab-panel value="analytics"><p>Detailed analytics and charts.</p></bl-tab-panel>
      <bl-tab-panel value="reports"><p>Generated reports and summaries.</p></bl-tab-panel>
      <bl-tab-panel value="exports"><p>Export data in various formats.</p></bl-tab-panel>
      <bl-tab-panel value="settings"><p>Configure dashboard settings.</p></bl-tab-panel>
    </bl-tabs>
  `,
};
