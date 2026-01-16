import { Customer } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getCustomerById(id : string) {
  try {
    await DbConnection();
    const user = await Customer.findById(id).lean();

    if(!user){
        return null
    }
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error);
  }
}
