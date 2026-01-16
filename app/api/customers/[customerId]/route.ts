import { Customer } from "@/database/models";
import { DbConnection } from "@/database/mongoose";
import { NextResponse } from "next/server";


interface IParams {
    customerId?: string;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const { customerId } = params;
    let body = await req.json();


    if (!customerId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const updateUser = await Customer.findByIdAndUpdate({ _id: customerId }, body, {
      new: true,
    });

    if (!updateUser) {
      return new NextResponse("Customer Not Found", { status: 404 });
    }

    return NextResponse.json(updateUser);
  } catch (error: any) {
    console.log("Update Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await DbConnection();

    const { customerId } = params;
    if (!customerId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const DeleteCustomer = await Customer.findByIdAndDelete({ _id: customerId });

    return NextResponse.json(DeleteCustomer);
  } catch (error: any) {
    console.log("Delete Customer Route", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
