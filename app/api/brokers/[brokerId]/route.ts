import { Customer } from "@/database/models";
import { Broker } from "@/database/models/broker.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";


interface IParams {
    brokerId?: string;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const { brokerId } = params;
    let body = await req.json();

    if (!brokerId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const updateBroker = await Broker.findByIdAndUpdate({ _id: brokerId }, body, {
      new: true,
    });

    if (!updateBroker) {
      return new NextResponse("Broker Not Found", { status: 404 });
    }

    return NextResponse.json(updateBroker);
  } catch (error: any) {
    console.log("Update Broker Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const { brokerId } = params;

    if (!brokerId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const DeleteBroker = await Broker.findByIdAndDelete({ _id: brokerId });

    return NextResponse.json(DeleteBroker);
  } catch (error: any) {
    console.log("Delete Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
