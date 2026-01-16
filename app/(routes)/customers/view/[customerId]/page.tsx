export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/getCustomerById";
import { SalesColumn } from "@/types";
import { getSaleByCustomerId} from "@/actions/getSaleByCustomerId";
import ViewCustomerClient from "@/components/Customer/ViewCustomerClient";

interface CustomerIdProps {
  customerId: string;
}

const CustomerViewPage = async ({ params }: { params: CustomerIdProps }) => {
  const customer = await getCustomerById(params.customerId);
  const data = await getSaleByCustomerId(params.customerId);

  const formattedData: SalesColumn[] =
    data?.map((sale: any) => ({
      id: sale?._id,
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
    <div className="p-5 flex flex-col gap-3">
      <ViewCustomerClient formattedData={formattedData} customer={customer} />
    </div>
  );
};

export default CustomerViewPage;
