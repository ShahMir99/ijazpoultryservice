import { getCurrentUser } from "@/actions/getCurrentUser";
import { Customer, Sale, User } from "@/database/models";
import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

interface IParams {
  invoiceId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("unauthenticated", { status: 401 });
    }

    if (!params.invoiceId) {
      return new NextResponse("Id is required", { status: 400 });
    }

    const findSale = await Sale.findById({ _id: params.invoiceId });

    if (!findSale) {
      return new NextResponse("Sales not found", { status: 404 });
    }

    return NextResponse.json(findSale);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    let body = await req.json();
    const { customerId, item, productId, quantity, supplyRate, received } = body;

    if (!customerId._id) {
      return new NextResponse("customer id is Required", { status: 400 });
    }

    let findSale = await Sale.findById(params.invoiceId);
    let findUser = await Customer.findById(customerId._id);
    let findProduct = await Product.findById(productId);

    if (!findSale) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    if (!findUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!findProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const totalprice = quantity * supplyRate;    
    const customerBalance = findSale.previousBalance + totalprice - received;
    const CustomerprevoiusBalance = findSale.previousBalance

    let newQuantity: number = 0;

    if (quantity > findSale.quantity) {
      newQuantity = quantity - findSale.quantity;
      newQuantity = findProduct.quantity - newQuantity;
    }
    if (findSale.quantity > quantity) {
      newQuantity = findSale.quantity - quantity;
      newQuantity = findProduct.quantity + newQuantity;
    }
    if (quantity === 0 && findSale.quantity >= 0) {
      newQuantity = findProduct.quantity + findSale.quantity
    }
    if (quantity === findSale.quantity) {
      newQuantity = findProduct.quantity
    }

    const updateSale = await Sale.findByIdAndUpdate(
      { _id: params.invoiceId },
      {
        item,
        quantity,
        buyingRate: findProduct.buyingRate,
        govtRate: findProduct.govtRate,
        supplyRate,
        totalPrice: totalprice,
        received,
        previousBalance: CustomerprevoiusBalance,
        currentBalance: customerBalance,
        customerId: customerId._id,
      },
      { new: true }
    );

    await Promise.all([
      Customer.findByIdAndUpdate(
        { _id: customerId._id },
        { balance: customerBalance },
        { new: true }
      ),

      Product.findByIdAndUpdate(
        { _id: productId },
        { quantity: newQuantity },
        { new: true }
      ),
    ]);

    const populatedSale = await Sale.findById(updateSale._id).populate(
      "customerId"
    );

    return NextResponse.json(populatedSale);

  } catch (error: any) {
    console.log("Create Invoice Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    if (!params.invoiceId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const DeleteSale = await Sale.findByIdAndDelete({ _id: params.invoiceId });

    return NextResponse.json(DeleteSale);
  } catch (error: any) {
    console.log("Delete Sale Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
