import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
  },
  args: {
    multiple: false,
  },
  render: (args) => html`
    <bl-accordion ?multiple=${args.multiple}>
      <bl-accordion-item value="item-1" open>
        <span slot="trigger">What is Blink UI?</span>
        Blink UI is a web component library built with Lit, providing accessible
        and customizable UI primitives for modern web applications.
      </bl-accordion-item>
      <bl-accordion-item value="item-2">
        <span slot="trigger">How do I install it?</span>
        Install via npm with <code>npm install @blink-ui/components</code>, then
        import the components you need.
      </bl-accordion-item>
      <bl-accordion-item value="item-3">
        <span slot="trigger">Does it work with React?</span>
        Yes! Blink UI provides React wrappers via <code>@lit/react</code>. Import
        from <code>@blink-ui/components/react</code> for typed React components.
      </bl-accordion-item>
    </bl-accordion>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true },
};

export const AllClosed: Story = {
  render: () => html`
    <bl-accordion>
      <bl-accordion-item value="item-1">
        <span slot="trigger">First item</span>
        Content for the first item.
      </bl-accordion-item>
      <bl-accordion-item value="item-2">
        <span slot="trigger">Second item</span>
        Content for the second item.
      </bl-accordion-item>
      <bl-accordion-item value="item-3">
        <span slot="trigger">Third item</span>
        Content for the third item.
      </bl-accordion-item>
    </bl-accordion>
  `,
};

export const WithDisabledItem: Story = {
  render: () => html`
    <bl-accordion>
      <bl-accordion-item value="item-1" open>
        <span slot="trigger">Enabled item</span>
        This item can be toggled.
      </bl-accordion-item>
      <bl-accordion-item value="item-2" disabled>
        <span slot="trigger">Disabled item</span>
        This item cannot be toggled.
      </bl-accordion-item>
      <bl-accordion-item value="item-3">
        <span slot="trigger">Another enabled item</span>
        This item can also be toggled.
      </bl-accordion-item>
    </bl-accordion>
  `,
};

export const FAQ: Story = {
  render: () => html`
    <bl-accordion>
      <bl-accordion-item value="returns">
        <span slot="trigger">What is your return policy?</span>
        You can return any item within 30 days of purchase for a full refund.
        Items must be in their original packaging and unused condition.
      </bl-accordion-item>
      <bl-accordion-item value="shipping">
        <span slot="trigger">How long does shipping take?</span>
        Standard shipping takes 5-7 business days. Express shipping is available
        for 2-3 business day delivery at an additional cost.
      </bl-accordion-item>
      <bl-accordion-item value="warranty">
        <span slot="trigger">Do you offer a warranty?</span>
        All products come with a 1-year manufacturer warranty covering defects
        in materials and workmanship.
      </bl-accordion-item>
    </bl-accordion>
  `,
};
