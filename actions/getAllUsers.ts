import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

export async function getAllUser() {
  try {
    await DbConnection();
    const users = await User.find({
      $or: [{ userType: "Admin" }, { userType: "User" }],
    });

    return users
  } catch (error) {
    console.log(error);
  }
}
