import React from 'react'
import BrokerForm from '@/components/Brokers/BrokerForm'
import { getBrokerById } from '@/actions/getBrokerById';

interface BrokerIdProps {
  brokerId: string;
}

const BrokerId  = async ({params} : {params : BrokerIdProps}) => {
  const broker = await getBrokerById(params.brokerId)

  return (
    <div className="p-5 flex flex-col gap-3">
    <BrokerForm initialData={broker} />
  </div>
  )
}

export default BrokerId