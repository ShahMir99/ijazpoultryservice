import { Customer } from "@/database/models";
import { Broker } from "@/database/models/broker.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();

    let body = await req.json();

    const { name, dueAmount, address, phone } = body;

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!address) {
      return new NextResponse("Address is Required", { status: 400 });
    }
    if (!phone) {
      return new NextResponse("Phone is Required", { status: 400 });
    }

    const createBroker = await Broker.create({
      name,
      dueAmount,
      address,
      phone,
    });

    return NextResponse.json(createBroker);
  } catch (error: any) {
    console.log("Create Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
