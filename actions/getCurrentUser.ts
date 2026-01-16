import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    await DbConnection();
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await User.findOne({
      email: session?.user?.email,
    }).select("-password -__v -createdAt -updatedAt");

    if (!currentUser) {
      return null;
    }

    const user = JSON.parse(JSON.stringify(currentUser));

    return user;
  } catch (error) {
    console.log(error);
  }
}
