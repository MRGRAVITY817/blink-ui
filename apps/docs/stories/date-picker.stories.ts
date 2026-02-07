import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Date Picker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-date-picker></bl-date-picker>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-date-picker value="2025-03-15"></bl-date-picker>
    </div>
  `,
};

export const WithMinMax: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-date-picker min="2025-01-01" max="2025-12-31"></bl-date-picker>
    </div>
  `,
};

export const CalendarStandalone: Story = {
  render: () => html`
    <bl-calendar value="2025-02-14"></bl-calendar>
  `,
};

export const DateFieldOnly: Story = {
  render: () => html`
    <bl-date-field value="2025-06-20"></bl-date-field>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <bl-date-picker disabled value="2025-01-01"></bl-date-picker>
    </div>
  `,
};
