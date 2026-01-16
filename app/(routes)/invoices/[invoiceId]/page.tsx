export const dynamic = 'force-dynamic';

import { getAllCustomers } from "@/actions/getAllCustomers";
import { getProducts } from "@/actions/getProducts";
import { getSaleById } from "@/actions/getSaleById";
import InvoiceForm from "@/components/Invoice/InvoiceForm";
import { CustomerColumn } from "@/types";

interface InvoiceIdPageProps {
  invoiceId : string
}

const InvoiceIdPage = async ({params} : {params : InvoiceIdPageProps}) => {
  const findCustomers = await getAllCustomers()
  const findProduct = await getProducts()
  const sale = await getSaleById(params.invoiceId)

  
  const customers : CustomerColumn[] = findCustomers?.map((cust) => ({
    _id: cust._id.toString(),
    name: cust.name,
    balance: cust.balance,
  })) ?? [];

  const initialData = sale ? {
    id : sale?._id,
    customerId: {
      _id: sale?.customerId._id,
      name: sale?.customerId?.name, 
      balance: sale?.previousBalance
    },
      quantity: sale?.quantity,
      supplyRate: sale?.supplyRate,
      received: sale?.received,
  } : null

  return (
    <div className="p-5 flex flex-col gap-3">
      <InvoiceForm initialData={initialData} customers={customers} products={findProduct}/>
    </div>
  );
};

export default InvoiceIdPage;
