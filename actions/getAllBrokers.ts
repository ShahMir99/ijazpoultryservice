import { Broker } from "@/database/models/broker.model";
import { DbConnection } from "@/database/mongoose";

export async function getAllBrokers() {
  try {
    await DbConnection();
    const brokers = await Broker.find({}).sort({name : 1});
    return brokers;
  } catch (error) {
    console.log(error);
  }
}
