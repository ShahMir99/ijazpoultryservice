export const dynamic = "force-dynamic";

import { BuyingType, SalesColumn } from "@/types";
import ViewCustomerClient from "@/components/Customer/ViewCustomerClient";
import { getBrokerById } from "@/actions/getBrokerById";
import { getBuyingById } from "@/actions/getBuyingById";
import ViewBrokerClient from "@/components/Brokers/ViewBrokerClient";

interface BrokerIdProps {
  brokerId: string;
}

const CustomerViewPage = async ({ params }: { params: BrokerIdProps }) => {

  const broker = await getBrokerById(params.brokerId);
  const buyings = await getBuyingById(params.brokerId);

  const formattedData: BuyingType[] = buyings?.map((buying) => ({
    id: buying?._id,
    name: buying?.brokerId?.name || "No Name",
    item: buying?.item,
    quantity: buying?.quantity,
    buyingRate: buying?.buyingRate,
    totalPrice: buying?.totalPrice,
    paidAmount: buying?.paidAmount,
    previousDue: buying?.previousDue,
    currentDue: buying?.currentDue,
    date: buying?.createdAt,
  })) ?? [];

  return (
    <div className="p-5 flex flex-col gap-3">
      <ViewBrokerClient formattedData={formattedData} broker={broker} />
    </div>
  );
};

export default CustomerViewPage;
