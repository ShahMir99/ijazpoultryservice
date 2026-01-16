"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModel } from "../modal/AlertModal";
import { BuyingType } from "@/types";
import { useUserRole } from "@/hooks/useUser";

interface CellActionProps {
  data: BuyingType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const role = useUserRole();

  const [Loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/buying/${data.id}`);
      router.refresh();
      toast.success("Buying deleted successfully.");
    } catch (err) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  if (role !== "Super Admin" && role !== "Admin") {
    return null;
  }

  return (
    <>
      <AlertModel
        isOpen={isModalOpen}
        Loading={Loading}
        onClose={() => setModalOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setModalOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
