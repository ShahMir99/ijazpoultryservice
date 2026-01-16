export const dynamic = 'force-dynamic';

import { getAllBrokers } from '@/actions/getAllBrokers';
import BrokerClient from '@/components/Brokers/BrokerClient'
import { BrokerColumn } from '@/types';

const BrokersPage = async () => {

  const getAllBroker = await getAllBrokers();
  const formattedData : BrokerColumn[] = getAllBroker?.map((broker) => ({
      id: broker._id,
      name: broker.name,
      dueAmount: broker.dueAmount,
      address: broker.address,
      phone: broker.phone,
    })) ?? [];

  return (
    <div className="p-5 flex flex-col gap-3"> 
    <BrokerClient data={formattedData}/>
    </div>
  )
}

export default BrokersPage