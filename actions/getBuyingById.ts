import { Buying } from "@/database/models/buying.model";
import { DbConnection } from "@/database/mongoose";

export async function getBuyingById(id: string) {
  try {
    await DbConnection();

    const findAllBuying = await Buying.find({ brokerId: id })
      .populate({
        path: "brokerId",
        select: "name",
      })
      .sort({ createdAt: -1 });

    return findAllBuying;
  } catch (error: any) {
    console.log(error);
  }
}
