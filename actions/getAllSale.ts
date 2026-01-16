import { Sale } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getAllSale() {
  try {
    await DbConnection();

    const now = new Date();
    const startMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    let filter: any = {
      createdAt: {
        $gt: startMonthDate,
        $lt: endMonthDate,
      },
    };

    const findCurrentMonthSale = await Sale.find(
      filter,
      "item quantity supplyRate totalPrice received previousBalance currentBalance createdAt"
    )
      .populate({
        path: "customerId",
        select: "name",
      })
      .sort({ createdAt: -1 });

    return findCurrentMonthSale;
  } catch (error: any) {
    console.log("Create Customer Route", error);
  }
}
