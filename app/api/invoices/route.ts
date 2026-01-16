import { Customer, Sale } from "@/database/models";
import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();

    let body = await req.json();
    const { customerId, item, quantity, supplyRate, received, createdAt, createdBy, sqliteid} = body;

    if (!customerId._id) {
      return new NextResponse("customer id is Required", { status: 400 });
    }

    const salefound = await Sale.findOne({sqliteid : sqliteid , isSync : true});

    if (salefound) {
      return new NextResponse("Sale is already synced", { status: 200 });
    }

    let findUser = await Customer.findById(customerId._id);
    let findProduct = await Product.findOne({});

    if (!findUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!findProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }


    const totalprice = quantity * supplyRate;
    const customerBalance = findUser.balance + totalprice - received;
    const newQuantity = findProduct.quantity - quantity;

    const isSync = customerId.source === "sqlite" ? true : false;

    const createSale = await Sale.create({
      item,
      quantity,
      buyingRate: findProduct.buyingRate,
      govtRate: findProduct.govtRate,
      supplyRate,
      totalPrice: totalprice,
      received,
      isSync,
      sqliteid,
      previousBalance: findUser.balance,
      currentBalance: customerBalance,
      customerId: customerId._id,
      createdBy,
      createdAt
    });

     await Promise.all([
      Customer.findByIdAndUpdate(
        { _id: customerId._id },
        { balance: customerBalance.toFixed(2)},
        { new: true }
      ),

      Product.findByIdAndUpdate(
        { _id: findProduct._id },
        { quantity: newQuantity.toFixed(2) },
        { new: true }
      ),
    ]);

    const populatedSale = await Sale.findById(createSale._id).populate(
      "customerId"
    );

    return NextResponse.json(populatedSale);
  } catch (error: any) {
    console.log("Create Invoice Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await DbConnection();

    const now = new Date();
    const startMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const sales = await Sale.find({
      createdAt: {
        $gt: startMonthDate,
        $lt: endMonthDate,
      },
    }).populate([
      {path: "customerId", select: "_id name balance" },
      {path: "CreatedBy", select: "_id name userType"}
    ]).sort({ createdAt: -1 });

    const response = NextResponse.json(sales);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
