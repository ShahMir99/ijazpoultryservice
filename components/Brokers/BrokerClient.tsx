"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "../ui/data-table";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { BrokerColumn } from "@/types";
import { columns } from "./columns";

interface BrokerClientProps {
  data : BrokerColumn[]
}

const BrokerClient : React.FC<BrokerClientProps> = ({data}) => {
  const router = useRouter();

  return (
    <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-neutral-800">Broker</h1>
          <p className="text-base text-neutral-900 font-normal">
            Manage brokers
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-3 bg-blue-500 text-white"
          onClick={() => router.push("/brokers/new")}
        >
          <p className="text-sm">Add Broker</p>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <hr className="my-7" />
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default BrokerClient;
