export const dynamic = 'force-dynamic';

import { getAllSale } from "@/actions/getAllSale";
import InvoiceClient from "@/components/Invoice/InvoiceClient";
import { SalesColumn } from "@/types";

const InvoicePage = async () => {
  const data = await getAllSale()

  const formattedData: SalesColumn[] = data?.map((sale) => ({
    id: sale?._id.toString(),
    name: sale?.customerId?.name || "No Name",
    item: sale?.item,
    quantity: sale?.quantity,
    supplyRate: sale?.supplyRate,
    totalPrice: sale?.totalPrice,
    received: sale?.received,
    previousBalance: sale?.previousBalance,
    currentBalance: sale?.currentBalance,
    date: sale?.createdAt,
  })) ?? [];

  return (
    <div className="p-5 flex flex-col gap-5">
      <InvoiceClient  formattedData={formattedData}/>
    </div>
  );
};

export default InvoicePage;
