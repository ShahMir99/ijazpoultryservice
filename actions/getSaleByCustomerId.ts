import { Sale } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getSaleByCustomerId(id : string) {
  try {
    await DbConnection();

    const findCurrentMonthSale = await Sale.find({customerId : id,})
      .populate({
        path: "customerId",
        select: "_id name balance",
      })
      .sort({ createdAt: -1 });

    return findCurrentMonthSale;
  } catch (error: any) {
    console.log("Create Customer Route", error);
  }
}