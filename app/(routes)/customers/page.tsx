export const dynamic = 'force-dynamic';

import { getAllCustomers } from "@/actions/getAllCustomers";
import CustomerClient from "@/components/Customer/CustomerClient";
import { CustomerColumn } from "@/types";

const CustomerPage = async () => {
  const getAllCustomer = await getAllCustomers();

  const formattedData: CustomerColumn[] =
    getAllCustomer?.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      balance: user.balance,
      address: user.address,
      phone: user.phone,
    })) ?? [];

  return (
    <div className="p-5 flex flex-col gap-3">
      <CustomerClient formattedData={formattedData} />
    </div>
  );
};

export default CustomerPage;
