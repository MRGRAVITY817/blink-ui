import type { JSX } from "solid-js";

const sectionStyle: JSX.CSSProperties = {
  "margin-bottom": "2.5rem",
};

const sectionTitle: JSX.CSSProperties = {
  "font-size": "1.25rem",
  "font-weight": 600,
  "margin-bottom": "1rem",
  "border-bottom": "1px solid #e5e7eb",
  "padding-bottom": "0.5rem",
};

const subheading: JSX.CSSProperties = {
  "font-size": "0.875rem",
  color: "#6b7280",
  "margin-bottom": "0.5rem",
};

const row: JSX.CSSProperties = {
  display: "flex",
  "flex-wrap": "wrap",
  gap: "0.75rem",
  "align-items": "center",
  "margin-bottom": "0.75rem",
};

const cardGrid: JSX.CSSProperties = {
  display: "grid",
  "grid-template-columns": "1fr 1fr",
  gap: "1rem",
};

const inputStack: JSX.CSSProperties = {
  display: "flex",
  "flex-direction": "column",
  gap: "1rem",
  "max-width": "360px",
};

const alertStack: JSX.CSSProperties = {
  display: "flex",
  "flex-direction": "column",
  gap: "0.75rem",
};

export default function App() {
  return (
    <div style={{ "max-width": "860px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ "font-size": "1.75rem", "font-weight": 700, "margin-bottom": "0.5rem" }}>
        Blink UI — Solid Example
      </h1>
      <p style={{ color: "#6b7280", "margin-bottom": "2.5rem" }}>
        Demonstrating all five components from <code>@blink-ui/components</code>{" "}
        using native custom element syntax.
      </p>

      {/* ── Button ────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Button</h2>

        <h3 style={subheading}>Variants</h3>
        <div style={row}>
          <bl-button variant="primary">Primary</bl-button>
          <bl-button variant="secondary">Secondary</bl-button>
          <bl-button variant="danger">Danger</bl-button>
          <bl-button variant="ghost">Ghost</bl-button>
        </div>

        <h3 style={subheading}>Sizes</h3>
        <div style={row}>
          <bl-button size="sm">Small</bl-button>
          <bl-button size="md">Medium</bl-button>
          <bl-button size="lg">Large</bl-button>
        </div>

        <h3 style={subheading}>Disabled</h3>
        <div style={row}>
          <bl-button disabled>Disabled</bl-button>
        </div>
      </section>

      {/* ── Card ──────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Card</h2>
        <div style={cardGrid}>
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

      {/* ── Input ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Input</h2>
        <div style={inputStack}>
          <bl-input placeholder="Default input" />
          <bl-input label="Email" placeholder="you@example.com" type="email" />
          <bl-input
            label="Username"
            placeholder="Pick a username"
            error
            help-text="This username is already taken."
          />
          <bl-input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </section>

      {/* ── Badge ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Badge</h2>
        <div style={row}>
          <bl-badge variant="primary">Primary</bl-badge>
          <bl-badge variant="secondary">Secondary</bl-badge>
          <bl-badge variant="success">Success</bl-badge>
          <bl-badge variant="warning">Warning</bl-badge>
          <bl-badge variant="danger">Danger</bl-badge>
          <bl-badge variant="neutral">Neutral</bl-badge>
        </div>
        <h3 style={subheading}>Sizes</h3>
        <div style={row}>
          <bl-badge variant="primary" size="sm">Small</bl-badge>
          <bl-badge variant="primary" size="md">Medium</bl-badge>
        </div>
      </section>

      {/* ── Alert ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Alert</h2>
        <div style={alertStack}>
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
  );
}
