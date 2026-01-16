import { Sale } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getSaleById(id : string) {
  try {
    await DbConnection();

    const SaleById = await Sale.findById({_id : id,})
      .populate({
        path: "customerId",
        select: "_id name balance",
      })

    return SaleById;
    
  } catch (error: any) {
    console.log("Create Customer Route", error);
  }
}