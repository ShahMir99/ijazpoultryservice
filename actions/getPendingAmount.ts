import { Customer } from "@/database/models";
import { Broker } from "@/database/models/broker.model";
import { DbConnection } from "@/database/mongoose";

export const getPendingAmount = async () => {
  await DbConnection();

  const [brokers, customer] = await Promise.all([
    Broker.find(),
    Customer.find(),
  ]);

  const pendingDues = brokers.reduce((acc, item) => acc + item.dueAmount,0);
  const pendingBalance = customer.reduce((acc, item) => acc + item.balance,0);

  return {pendingDues, pendingBalance};
};
