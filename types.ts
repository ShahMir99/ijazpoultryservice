import { UserTypes } from "./enums";

export type User = {
  id: string;
  name: string;
  email: string;
  userType: UserTypes;
  image?: string;
  phone?: string;
  address?: string;
};
export type SalesColumn = {
  id: string;
  name: string;
  item: string;
  quantity: number;
  totalPrice: number;
  supplyRate: number;
  received: number;
  previousBalance: number;
  currentBalance: number;
  date: string;
};

export type BuyingType = {
  id: string;
  name: string;
  item: string;
  quantity: number;
  totalPrice: number;
  buyingRate: number;
  paidAmount: number;
  previousDue: number;
  currentDue: number;
  date: string;
};

export type CustomerColumn = {
  _id: string;
  name: string;
  address?: string;
  phone?: string;
  balance: number;
};

export type BrokerColumn = {
  id: string;
  name: string;
  dueAmount: number;
  address?: string;
  phone?: string;
};

export type UserColumn = {
  id: string;
  name: string;
  image: string;
  type: UserTypes;
};

// for Main Pages interface

export type InvoiceClientProps = {
  formattedData: SalesColumn[];
};

export type CustomerClientProps = {
  formattedData: CustomerColumn[];
};

export type UserClientProps = {
  user: User;
  formattedData: UserColumn[];
};


export type ViewCustomerClientProps = {
  formattedData: SalesColumn[];
  customer : CustomerColumn 
};

export type ViewBrokerClientProps = {
  formattedData: BuyingType[];
  broker : BrokerColumn 
};