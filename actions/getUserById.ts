import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getUserById(id : string) {
  try {
    await DbConnection();
    const user = await User.findById(id);

    if(!user){
        return null
    }
    return user
  } catch (error) {
    console.log(error);
  }
}
