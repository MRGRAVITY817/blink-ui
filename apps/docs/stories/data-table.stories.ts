import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import type { ColumnDef } from "@blink-ui/components/data-table";

const meta: Meta = {
  title: "Components/Data Table",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ---- Sample data types ----
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "invited";
  lastLogin: string;
}

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

// ---- Sample data ----
const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active", lastLogin: "2024-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "active", lastLogin: "2024-01-14" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Viewer", status: "inactive", lastLogin: "2023-12-20" },
  { id: "4", name: "David Lee", email: "david@example.com", role: "Editor", status: "active", lastLogin: "2024-01-13" },
  { id: "5", name: "Eve Martinez", email: "eve@example.com", role: "Admin", status: "invited", lastLogin: "" },
  { id: "6", name: "Frank Chen", email: "frank@example.com", role: "Viewer", status: "active", lastLogin: "2024-01-10" },
  { id: "7", name: "Grace Kim", email: "grace@example.com", role: "Editor", status: "active", lastLogin: "2024-01-12" },
  { id: "8", name: "Henry Wilson", email: "henry@example.com", role: "Viewer", status: "inactive", lastLogin: "2023-11-15" },
  { id: "9", name: "Iris Patel", email: "iris@example.com", role: "Admin", status: "active", lastLogin: "2024-01-15" },
  { id: "10", name: "Jack Brown", email: "jack@example.com", role: "Editor", status: "active", lastLogin: "2024-01-14" },
  { id: "11", name: "Kate Lopez", email: "kate@example.com", role: "Viewer", status: "inactive", lastLogin: "2023-10-05" },
  { id: "12", name: "Liam Davis", email: "liam@example.com", role: "Editor", status: "invited", lastLogin: "" },
  { id: "13", name: "Mia Anderson", email: "mia@example.com", role: "Viewer", status: "active", lastLogin: "2024-01-11" },
  { id: "14", name: "Noah Taylor", email: "noah@example.com", role: "Admin", status: "active", lastLogin: "2024-01-15" },
  { id: "15", name: "Olivia Thomas", email: "olivia@example.com", role: "Editor", status: "active", lastLogin: "2024-01-09" },
];

const payments: Payment[] = [
  { id: "PAY-001", amount: 316.00, status: "success", email: "alice@example.com" },
  { id: "PAY-002", amount: 242.00, status: "success", email: "bob@example.com" },
  { id: "PAY-003", amount: 837.00, status: "processing", email: "carol@example.com" },
  { id: "PAY-004", amount: 874.00, status: "success", email: "david@example.com" },
  { id: "PAY-005", amount: 721.00, status: "failed", email: "eve@example.com" },
  { id: "PAY-006", amount: 453.00, status: "pending", email: "frank@example.com" },
  { id: "PAY-007", amount: 129.00, status: "success", email: "grace@example.com" },
  { id: "PAY-008", amount: 984.00, status: "processing", email: "henry@example.com" },
];

// ---- Column definitions ----
const userColumns: ColumnDef<User, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;
      const variant = status === "active" ? "success" : status === "invited" ? "primary" : "secondary";
      return html`<bl-badge variant=${variant}>${status}</bl-badge>`;
    },
  },
  { accessorKey: "lastLogin", header: "Last Login" },
];

const paymentColumns: ColumnDef<Payment, any>[] = [
  { accessorKey: "id", header: "Invoice" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;
      const variant = status === "success" ? "success" : status === "failed" ? "danger" : "secondary";
      return html`<bl-badge variant=${variant}>${status}</bl-badge>`;
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => {
      const amount = info.getValue() as number;
      return `$${amount.toFixed(2)}`;
    },
  },
];

// ---- Stories ----

export const Default: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${userColumns.slice(0, 4)}
        .data=${users.slice(0, 5)}
      ></bl-data-table>
    `;
  },
};

export const Sortable: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${userColumns}
        .data=${users}
        enable-sorting
        @bl-sort-change=${(e: CustomEvent) => console.log("Sort:", e.detail)}
      ></bl-data-table>
    `;
  },
};

export const WithPagination: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${userColumns}
        .data=${users}
        enable-sorting
        enable-pagination
        page-size="5"
        @bl-page-change=${(e: CustomEvent) => console.log("Page:", e.detail)}
      ></bl-data-table>
    `;
  },
};

export const WithRowSelection: Story = {
  render: () => {
    const selectColumns: ColumnDef<User, any>[] = [
      {
        id: "select",
        header: (ctx) => html`
          <input
            type="checkbox"
            .checked=${ctx.table.getIsAllRowsSelected()}
            .indeterminate=${ctx.table.getIsSomeRowsSelected()}
            @change=${ctx.table.getToggleAllRowsSelectedHandler()}
          />
        `,
        cell: (ctx) => html`
          <input
            type="checkbox"
            .checked=${ctx.row.getIsSelected()}
            @change=${ctx.row.getToggleSelectedHandler()}
          />
        `,
        size: 40,
        enableSorting: false,
      },
      ...userColumns,
    ];

    return html`
      <bl-data-table
        .columns=${selectColumns}
        .data=${users.slice(0, 8)}
        enable-selection
        enable-sorting
        enable-pagination
        page-size="5"
        @bl-selection-change=${(e: CustomEvent) => console.log("Selection:", e.detail)}
      ></bl-data-table>
    `;
  },
};

export const StripedRows: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${paymentColumns}
        .data=${payments}
        enable-sorting
        striped
      ></bl-data-table>
    `;
  },
};

export const EmptyState: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${userColumns.slice(0, 3)}
        .data=${[]}
      >
        <div slot="empty" style="padding: 2rem; text-align: center; color: var(--bl-color-neutral-400);">
          <p style="margin: 0 0 0.5rem">No users found</p>
          <p style="margin: 0; font-size: 0.75rem">Try adjusting your search or filter criteria.</p>
        </div>
      </bl-data-table>
    `;
  },
};

export const Payments: Story = {
  render: () => {
    return html`
      <bl-data-table
        .columns=${paymentColumns}
        .data=${payments}
        enable-sorting
        enable-pagination
        page-size="5"
      ></bl-data-table>
    `;
  },
};
