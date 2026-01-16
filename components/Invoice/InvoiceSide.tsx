"use client";

import { formatter } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const InvoiceSide = ({ formValue }: any) => {
  let date = new Date();
  const currentDate = date.toLocaleDateString();

  const { customerId, item, quantity, received, supplyRate, govtRate } = formValue;

  const total = quantity * supplyRate;
  const currentBalance = customerId.balance + total - received;

  return (
    <div id="printMe" className="space-y-3 flex flex-col w-full flex-1">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-muted-foreground">INVOICE</h1>
        <h3 className="font-semibold text-lg text-muted-foreground">
          <span className="text-black">Umer</span> Poultry
        </h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="text-xs">Chack No. 12/1-AL</p>
        </div>
        <div>
          <h3 className="font-semibold">Date</h3>
          <p className="text-sm">{currentDate}</p>
        </div>
      </div>
      <div>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className=" text-black p-2">Name</TableHead>
              <TableHead className="text-black p-2">Quantity</TableHead>
              <TableHead className="text-black p-2">GR</TableHead>
              <TableHead className="text-black p-2">SR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{customerId.name}</TableCell>
              <TableCell>{quantity} kg</TableCell>
              <TableCell>{formatter.format(govtRate || 0)}</TableCell>
              <TableCell>{formatter.format(supplyRate || 0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <hr />
      <div className="space-y-1 flex-1 pt-6">
        <div className="flex items-center justify-end">
          <p className="text-xs">Total Amount :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {formatter.format(total || 0)}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Received Amount :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {formatter.format(received || 0)}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Previous Balance :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {formatter.format(customerId?.balance || 0)}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Current Balance :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {formatter.format(currentBalance || 0)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSide;
