"use client";

import { ViewCustomerClientProps} from "@/types";
import { columns } from "../Invoice/columns";
import { DataTable } from "../ui/data-table";


const ViewCustomerClient : React.FC<ViewCustomerClientProps> = ({formattedData , customer}) => {
  return (
    <div className="bg-white/70 rounded-lg p-5 shadow-card ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-neutral-800">{customer?.name}</h1>
          <p className="text-base text-neutral-900 font-normal">
            All Invoices for {customer?.name}
          </p>
        </div>
      </div>
      <hr className="my-7" />
      <DataTable data={formattedData} columns={columns} />
    </div>
  );
};

export default ViewCustomerClient;
