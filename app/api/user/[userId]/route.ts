import { User } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  userId?: string;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { userId } = params;
    let body = await req.json();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const updateUser = await User.findByIdAndUpdate({ _id: userId }, body, {
      new: true,
    });

    if (!updateUser) {
      return new NextResponse("User Not Found", { status: 404 });
    }

    return NextResponse.json(updateUser);
  } catch (error: any) {
    console.log("Update User Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { userId } = params;
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const DeleteUser = await User.findByIdAndDelete({ _id: userId });

    return NextResponse.json(DeleteUser);
  } catch (error: any) {
    console.log("Delete User Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
