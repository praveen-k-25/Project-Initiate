import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "email", header: "Email" },
];
