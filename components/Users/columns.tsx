"use client";

import { UserTypes } from "@/enums";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserColumn } from "@/types";


export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image} />
        <AvatarFallback>{row?.original?.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Role",
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
