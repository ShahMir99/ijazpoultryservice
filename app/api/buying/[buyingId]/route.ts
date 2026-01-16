import { getCurrentUser } from "@/actions/getCurrentUser";
import { Sale } from "@/database/models";
import { Buying } from "@/database/models/buying.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

interface IParams {
    buyingId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.buyingId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const DeleteBuying= await Buying.findByIdAndDelete({ _id: params.buyingId });

    return NextResponse.json(DeleteBuying);
  } catch (error: any) {
    console.log("Delete Buying Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}