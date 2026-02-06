<script lang="ts">
  // All bl-* custom elements are registered globally via the
  // "@blink-ui/components/define" side-effect import in main.ts.
  // No component imports needed here.
</script>

<div class="container">
  <h1>Blink UI — Svelte Example</h1>
  <p class="subtitle">
    Demonstrating all five components from <code>@blink-ui/components</code>
    using native custom element syntax.
  </p>

  <!-- Button -->
  <section>
    <h2>Button</h2>

    <h3 class="subheading">Variants</h3>
    <div class="row">
      <bl-button variant="primary">Primary</bl-button>
      <bl-button variant="secondary">Secondary</bl-button>
      <bl-button variant="danger">Danger</bl-button>
      <bl-button variant="ghost">Ghost</bl-button>
    </div>

    <h3 class="subheading">Sizes</h3>
    <div class="row">
      <bl-button size="sm">Small</bl-button>
      <bl-button size="md">Medium</bl-button>
      <bl-button size="lg">Large</bl-button>
    </div>

    <h3 class="subheading">Disabled</h3>
    <div class="row">
      <bl-button disabled>Disabled</bl-button>
    </div>
  </section>

  <!-- Card -->
  <section>
    <h2>Card</h2>
    <div class="card-grid">
      <bl-card variant="outlined">
        <span slot="header">Outlined Card</span>
        <p>This card uses the <strong>outlined</strong> variant with a visible border.</p>
        <span slot="footer">Footer content</span>
      </bl-card>
      <bl-card variant="elevated">
        <span slot="header">Elevated Card</span>
        <p>This card uses the <strong>elevated</strong> variant with a box shadow.</p>
        <span slot="footer">Footer content</span>
      </bl-card>
    </div>
  </section>

  <!-- Input -->
  <section>
    <h2>Input</h2>
    <div class="input-stack">
      <bl-input placeholder="Default input"></bl-input>
      <bl-input label="Email" placeholder="you@example.com" type="email"></bl-input>
      <bl-input
        label="Username"
        placeholder="Pick a username"
        error
        help-text="This username is already taken."
      ></bl-input>
      <bl-input label="Disabled" placeholder="Cannot edit" disabled></bl-input>
    </div>
  </section>

  <!-- Badge -->
  <section>
    <h2>Badge</h2>
    <div class="row">
      <bl-badge variant="primary">Primary</bl-badge>
      <bl-badge variant="secondary">Secondary</bl-badge>
      <bl-badge variant="success">Success</bl-badge>
      <bl-badge variant="warning">Warning</bl-badge>
      <bl-badge variant="danger">Danger</bl-badge>
      <bl-badge variant="neutral">Neutral</bl-badge>
    </div>
    <h3 class="subheading">Sizes</h3>
    <div class="row">
      <bl-badge variant="primary" size="sm">Small</bl-badge>
      <bl-badge variant="primary" size="md">Medium</bl-badge>
    </div>
  </section>

  <!-- Alert -->
  <section>
    <h2>Alert</h2>
    <div class="alert-stack">
      <bl-alert variant="info">
        This is an informational alert message.
      </bl-alert>
      <bl-alert variant="success">
        Operation completed successfully!
      </bl-alert>
      <bl-alert variant="warning">
        Please review the changes before proceeding.
      </bl-alert>
      <bl-alert variant="danger" closable>
        Something went wrong. This alert is closable.
      </bl-alert>
    </div>
  </section>
</div>

<style>
  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #6b7280;
    margin-bottom: 2.5rem;
  }

  section {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .subheading {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .input-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 360px;
  }

  .alert-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
