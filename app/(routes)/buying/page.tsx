export const dynamic = 'force-dynamic';

import { getAllBuyings } from "@/actions/getAllBuyings";
import BuyingClient from "@/components/buying/BuyingClient";
import { BuyingType } from "@/types";


const BuyingPage = async () => {
  const buyings = await getAllBuyings()

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
    <div className="p-5 flex flex-col gap-5">
      <BuyingClient  formattedData={formattedData}/>
    </div>
  );
};

export default BuyingPage;
