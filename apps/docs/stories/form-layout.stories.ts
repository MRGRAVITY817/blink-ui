import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Form Layout",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => html`
    <bl-form-layout layout="vertical">
      <bl-form-field>
        <bl-label slot="label">Email</bl-label>
        <bl-input placeholder="you@example.com"></bl-input>
        <bl-form-description slot="description">We'll never share your email.</bl-form-description>
      </bl-form-field>
      <bl-form-field required>
        <bl-label slot="label">Password</bl-label>
        <bl-input type="password" placeholder="••••••••"></bl-input>
      </bl-form-field>
    </bl-form-layout>
  `,
};

export const Horizontal: Story = {
  render: () => html`
    <bl-form-layout layout="horizontal">
      <bl-form-field>
        <bl-label slot="label">First Name</bl-label>
        <bl-input placeholder="John"></bl-input>
      </bl-form-field>
      <bl-form-field>
        <bl-label slot="label">Last Name</bl-label>
        <bl-input placeholder="Doe"></bl-input>
      </bl-form-field>
    </bl-form-layout>
  `,
};

export const Inline: Story = {
  render: () => html`
    <bl-form-layout layout="inline">
      <bl-form-field>
        <bl-label slot="label">Search</bl-label>
        <bl-input placeholder="Search..."></bl-input>
      </bl-form-field>
      <bl-button>Go</bl-button>
    </bl-form-layout>
  `,
};

export const WithError: Story = {
  render: () => html`
    <bl-form-layout layout="vertical">
      <bl-form-field required>
        <bl-label slot="label">Email</bl-label>
        <bl-input placeholder="you@example.com" value="invalid"></bl-input>
        <bl-form-error slot="error">Please enter a valid email address.</bl-form-error>
      </bl-form-field>
    </bl-form-layout>
  `,
};

export const WithFieldset: Story = {
  render: () => html`
    <bl-form-layout layout="vertical">
      <bl-form-fieldset legend="Personal Information">
        <bl-form-field>
          <bl-label slot="label">Name</bl-label>
          <bl-input placeholder="John Doe"></bl-input>
        </bl-form-field>
        <bl-form-field>
          <bl-label slot="label">Email</bl-label>
          <bl-input placeholder="john@example.com"></bl-input>
        </bl-form-field>
      </bl-form-fieldset>
    </bl-form-layout>
  `,
};
