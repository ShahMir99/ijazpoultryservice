import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    await DbConnection();
    const body = await req.json();
    const { email, password } = body;

    const findUser = await User.findOne({ email }).select("-__v");

    if (!findUser) {
      return new NextResponse("Invalid Credentials", { status: 401 });
    }

    const isMathed = findUser.password === password

    if (!isMathed) {
      return new NextResponse("Invalid Credentials", { status: 401 });
    }

    const ResUser = findUser.toObject()
    delete ResUser.password

    const token = jwt.sign({...ResUser}, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    })

    return NextResponse.json({token});
  } catch (err) {
    console.log("Erorr in Login User", err);
    return new NextResponse("Erorr in Login User", { status: 500 });
  }
}
