"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { formatter } from "@/lib/utils";
import { CustomerColumn } from "@/types";
import NameComponent from "../NameComponent";


export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <NameComponent title="customers" original={row.original}/>
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
  },
  {
    accessorKey: "balance",
    header: "balance",
    cell: ({ row }) => <div>{formatter.format(row.original.balance)}</div>,
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
