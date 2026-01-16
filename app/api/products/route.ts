import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();

    let body = await req.json();
    const { name, quantity, buyingRate, govtRate } = body;

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }

    const createProduct = await Product.create({
        name, quantity, buyingRate, govtRate
    });

    return NextResponse.json(createProduct);
  } catch (error: any) {
    console.log("Create Product Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    await DbConnection();
    const createProduct = await Product.findOne({}).sort({name : 1});
    return NextResponse.json(createProduct);
  } catch (error: any) {
    console.log("Create Invoice Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}