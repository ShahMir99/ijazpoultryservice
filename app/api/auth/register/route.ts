import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();
    const body = await req.json();
    console.log("body",body)
    const { name, email, password, userType, ...rest } = body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return new NextResponse("User is already exist with this email", {status: 409})
    }
    const findSuperAdmin = await User.findOne({ userType : "Super Admin" });

    if(findSuperAdmin && (findSuperAdmin.userType === userType)){
      return new NextResponse("Super admin is already exist", {status: 409})
    }

    const user = await User.create({
      name,
      email,
      password,
      userType,
      ...rest
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log("Erorr in Registering User", err);
    return new NextResponse("Erorr in Registering User", { status: 500 });
  }
}
