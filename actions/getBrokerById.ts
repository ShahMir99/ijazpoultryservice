import { Broker } from "@/database/models/broker.model";
import { DbConnection } from "@/database/mongoose";

export async function getBrokerById(id : string) {
  try {
    await DbConnection();
    const broker = await Broker.findById(id);

    if(!broker){
        return null
    }
    return broker
  } catch (error) {
    console.log(error);
  }
}
