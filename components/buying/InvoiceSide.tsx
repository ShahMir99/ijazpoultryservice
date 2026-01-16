"use client";

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
  const { customer, item, quantity, received, supplyRate } = formValue;
  const total = quantity * supplyRate;
  const currentBalance = (customer.balance + total) - received;


  return (
    <div id="printMe" className="space-y-3 flex flex-col w-full flex-1">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-muted-foreground">INVOICE</h1>
        <h3 className="font-semibold text-lg text-muted-foreground">
          <span className="text-blue-500">Umer</span> Poultry
        </h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="font-semibold">Adress</h3>
          <p className="text-xs">Chack No. 12/1-AL</p>
        </div>
        <div>
          <h3 className="font-semibold">Date</h3>
          <p className="text-sm">{currentDate}</p>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Customer</TableHead>
              <TableHead className="">Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Supply Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell className="font-medium">{item}</TableCell>
              <TableCell>{quantity} kg</TableCell>
              <TableCell>{supplyRate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <hr />
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-end">
          <p className="text-xs">Total Amount :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {total || 0}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Received Amount :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {received || 0}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Previous Balance :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {customer?.balance || 0}
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-xs">Current Balance :</p>&nbsp;
          <h3 className="text-sm font-semibold text-muted-foreground">
            {currentBalance || 0}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSide;
