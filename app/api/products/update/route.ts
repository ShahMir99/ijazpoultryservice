import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await DbConnection();

    let data = await req.json();
    const { name, quantity, buyingRate, govtRate } = data;

    if (!name) {
      return new NextResponse("name is Required", { status: 400 });
    }
    
    let findProduct = await Product.findOne();

    if (!findProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    findProduct.quantity = quantity;
    findProduct.buyingRate = buyingRate;
    findProduct.govtRate = govtRate;

    await findProduct.save();

    return NextResponse.json(findProduct);
  } catch (error: any) {
    console.log("Create Invoice Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
