import { Customer, User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getAllCustomers() {
  try {
    await DbConnection();
    const customers = await Customer.find({isDeleted : false}).sort({name : 1});
    return customers;
  } catch (error) {
    console.log(error);
  }
}
