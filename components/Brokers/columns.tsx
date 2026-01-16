"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { formatter } from "@/lib/utils";
import { BrokerColumn } from "@/types";
import NameComponent from "../NameComponent";


export const columns: ColumnDef<BrokerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <NameComponent title="brokers" original={row.original}/>
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
    accessorKey: "dueAmount",
    header: "Due Amount",
    cell: ({ row }) => <div>{formatter.format(row?.original?.dueAmount)}</div>,
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
