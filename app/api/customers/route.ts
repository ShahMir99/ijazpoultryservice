import { Customer } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();

    let body = await req.json();

    const { name, balance, address, phone } = body;

    if (!name) {
      return new NextResponse("Name is Required", { status: 499 });
    }
    if (!address) {
      return new NextResponse("Address is Required", { status: 499 });
    }
    if (!phone) {
      return new NextResponse("Phone is Required", { status: 499 });
    }

    const createUser = await Customer.create({
      name,
      balance,
      address,
      phone,
    });

    return NextResponse.json(createUser);
  } catch (error: any) {
    console.log("Create Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await DbConnection();
    const customer = await Customer.find({}).sort({ name: "asc" });
    return NextResponse.json(customer);
  } catch (error: any) {
    console.log("Get Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
