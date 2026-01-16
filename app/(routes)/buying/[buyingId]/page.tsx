export const dynamic = 'force-dynamic';

import { getAllBrokers } from "@/actions/getAllBrokers";
import BuyingForm from "@/components/buying/BuyingForm";
import InvoiceForm from "@/components/Invoice/InvoiceForm";
import { BrokerColumn } from "@/types";


const BuyingIdPage = async () => {
  const findBrokers = await getAllBrokers()

  const brokers : BrokerColumn[] = findBrokers?.map((broker) => ({
    id: broker._id,
    name: broker.name,
    dueAmount: broker.dueAmount,
  })) ?? [];

  return (
    <div className="p-5 flex flex-col gap-3">
      <BuyingForm brokers={brokers} />
    </div>
  );
};

export default BuyingIdPage;
