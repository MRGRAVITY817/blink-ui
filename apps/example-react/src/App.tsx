import { Button, Card, Input, Badge, Alert } from "@blink-ui/components/react";

const sectionStyle: React.CSSProperties = {
  marginBottom: "2.5rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: "1rem",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "0.5rem",
};

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  alignItems: "center",
  marginBottom: "0.75rem",
};

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const inputStack: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "360px",
};

const alertStack: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

export default function App() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Blink UI — React Example
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2.5rem" }}>
        Demonstrating all five components from <code>@blink-ui/components</code>{" "}
        using <code>@lit/react</code> wrappers.
      </p>

      {/* ── Button ────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Button</h2>

        <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Variants
        </h3>
        <div style={row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Sizes
        </h3>
        <div style={row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Disabled
        </h3>
        <div style={row}>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* ── Card ──────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Card</h2>
        <div style={cardGrid}>
          <Card variant="outlined">
            <span slot="header">Outlined Card</span>
            <p>This card uses the <strong>outlined</strong> variant with a visible border.</p>
            <span slot="footer">Footer content</span>
          </Card>
          <Card variant="elevated">
            <span slot="header">Elevated Card</span>
            <p>This card uses the <strong>elevated</strong> variant with a box shadow.</p>
            <span slot="footer">Footer content</span>
          </Card>
        </div>
      </section>

      {/* ── Input ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Input</h2>
        <div style={inputStack}>
          <Input placeholder="Default input" />
          <Input label="Email" placeholder="you@example.com" type="email" />
          <Input
            label="Username"
            placeholder="Pick a username"
            error
            help-text="This username is already taken."
          />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </section>

      {/* ── Badge ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Badge</h2>
        <div style={row}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
        <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          Sizes
        </h3>
        <div style={row}>
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary" size="md">Medium</Badge>
        </div>
      </section>

      {/* ── Alert ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Alert</h2>
        <div style={alertStack}>
          <Alert variant="info">
            This is an informational alert message.
          </Alert>
          <Alert variant="success">
            Operation completed successfully!
          </Alert>
          <Alert variant="warning">
            Please review the changes before proceeding.
          </Alert>
          <Alert variant="danger" closable>
            Something went wrong. This alert is closable.
          </Alert>
        </div>
      </section>
    </div>
  );
}
