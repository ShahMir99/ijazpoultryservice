"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { BuyingType } from "@/types";
import { columns } from "./columns";
import { DataTable } from "../ui/data-table";


const BuyingClient = ({formattedData} : {formattedData : BuyingType[]}) => {
  const router = useRouter();
  return (
    <div className="bg-white/70 rounded-lg p-5 shadow-card ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-neutral-800">Buying</h1>
          <p className="text-base text-neutral-900 font-normal">
            Create and Manage you Buying items
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-3 bg-blue-500 text-white"
          onClick={() => router.push("/buying/new")}
        >
          <p className="text-sm">Buy Chicken</p>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <hr className="my-7" />
      <DataTable data={formattedData} columns={columns} />
    </div>
  );
};

export default BuyingClient;
