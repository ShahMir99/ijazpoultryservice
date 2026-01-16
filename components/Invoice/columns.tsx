"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { useUserRole } from "@/hooks/useUser";
import { formatter } from "@/lib/utils";
import moment from "moment";
import { SalesColumn } from "@/types";

export const columns: ColumnDef<SalesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity} kg</div>,
  },
  {
    accessorKey: "supplyRate",
    header: "Rate",
    cell: ({ row }) => <div>{formatter.format(row.original.supplyRate)}</div>,
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => <div>{formatter.format(row.original.totalPrice)}</div>,
  },
  {
    accessorKey: "previousBalance",
    header: "Previous",
    cell: ({ row }) => (
      <div>{formatter.format(row.original.previousBalance)}</div>
    ),
  },
  {
    accessorKey: "received",
    header: "Received",
    cell: ({ row }) => <div>{formatter.format(row.original.received)}</div>,
  },
  {
    accessorKey: "currentBalance",
    header: "Current",
    cell: ({ row }) => (
      <div>{formatter.format(row.original.currentBalance)}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>{moment(row.original.date).format("MMM Do YYYY")}</div>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
