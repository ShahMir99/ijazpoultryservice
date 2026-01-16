export const dynamic = 'force-dynamic';

import CustomerForm from "@/components/Customer/CustomerForm";
import { getCustomerById } from "@/actions/getCustomerById";

interface CustomerIdProps {
    customerId: string;
}

const CustomerIdPage = async ({ params }: { params: CustomerIdProps }) => {
  const Customer = await getCustomerById(params.customerId);
  return (
    <div className="p-5 flex flex-col gap-3"> 
      <CustomerForm initialData={Customer} />
    </div>
  );
};

export default CustomerIdPage;