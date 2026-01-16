import { Customer } from "@/database/models";
import { Broker } from "@/database/models/broker.model";
import { Buying } from "@/database/models/buying.model";
import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await DbConnection();
    let body = await req.json();

    const {
      broker: { id, dueAmount },
      item,
      quantity,
      buyingRate,
      paidAmount,
    } = body;

    if (!id) {
      return new NextResponse("Broker id is Required", { status: 400 });
    }

    const findBroker = await Broker.findById(id);
    if (!findBroker) {
      return new NextResponse("Broker not found", { status: 404 });
    }

    const totalprice = quantity * buyingRate;
    const BrokerDue = dueAmount + totalprice - paidAmount;

    const CreateBuying = await Buying.create({
      item,
      quantity,
      buyingRate,
      totalPrice: totalprice,
      paidAmount,
      previousDue: dueAmount,
      currentDue: BrokerDue,
      brokerId: id,
    });

    await Promise.all([
      Broker.findByIdAndUpdate(
        { _id: id },
        { dueAmount: BrokerDue },
        { new: true }
      ),
      Product.findOneAndUpdate(
        {},
        { $inc: { quantity: quantity } },
        { new: true }
      ),
    ]);

    return NextResponse.json(CreateBuying);
  } catch (error: any) {
    console.log("Create Invoice Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
