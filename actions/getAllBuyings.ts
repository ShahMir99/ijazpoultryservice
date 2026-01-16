import { Buying } from "@/database/models/buying.model";
import { DbConnection } from "@/database/mongoose";

export async function getAllBuyings() {
  try {
    await DbConnection();
    const brokers = await Buying.find({}).populate({
      path: "brokerId",
      select: "name",
    })
    .sort({ createdAt: -1 });

    return brokers;
  } catch (error) {
    console.log(error);
  }
}
