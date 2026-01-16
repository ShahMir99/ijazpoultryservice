"use client";
import { useReactToPrint } from "react-to-print";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { Button } from "../ui/button";
import CustomInput from "../ui/CustomInput";
import { cn, getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import InvoiceSide from "./InvoiceSide";
import { CustomerColumn } from "@/types";

interface InvoiceFormProps {
  initialData: any;
  customers: CustomerColumn[];
  products: any;
}

const formSchema = z.object({
  customerId: z.object({
    _id: z.string(),
    name: z.string(),
    balance: z.number(),
  }),
  item: z.string().min(1, { message: "Item name is required" }),
  productQuantity: z.number().optional(),
  productId: z.string(),
  quantity: z.number().optional(),
  supplyRate: z.number().optional(),
  govtRate: z.number().optional(),
  received: z.number().optional(),
});

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  customers,
  products,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      customerId: {
        _id: "",
        name: "",
        balance: "",
      },
      item: "",
      productQuantity: "",
      productId: "",
      quantity: "",
      govtRate: "",
      supplyRate: "", 
      received: "", 
    },
  });


  const formValue = watch();

  const handleChange = (value: any) => {
    const product = products.find((product: any) => product.name === value);

    setSelectedProduct(product);
    setValue("item", product.name);
    setValue("govtRate", product.govtRate);
    setValue("productQuantity", product.quantity);
    setValue("productId", product?._id);
  };

  const toastNotification = initialData
    ? "Invoice Updated Successfully"
    : "Invoice Created Successfully";

  const ButtonAndLabelText = initialData
    ? "Update"
    : "Create";



  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await axios.patch(`/api/invoices/${initialData.id}`, data);
      } else {
        await axios.post(`/api/invoices`, data);
        // window.print();
      }
      toast.success(toastNotification);
      router.push("/invoices");
      router.refresh();
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data || "Internal server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="grid gap-5 lg:grid-cols-2">
      <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-neutral-800">{ButtonAndLabelText}</h1>
          <p className="text-sm text-neutral-900 font-normal">
            {ButtonAndLabelText} invoice and save in system
          </p>
        </div>

        <hr className="my-4" />

        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-7">
          <div className="grid grid-cols-1 gap-3">
            <Controller
              control={control}
              name="customerId"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor="customer" className="text-sm font-normal">
                    Customer Name
                  </label>
                  <Popover open={open} onOpenChange={setOpen} >
                    <PopoverTrigger asChild disabled={initialData && true}>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value?.name && "text-muted-foreground"
                        )}
                      >
                        {field.value.name
                          ? customers.find(
                              (customer: any) =>
                                customer.name === field.value.name
                            )?.name
                          : "Select Person"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[320px] lg:w-[460px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Person..." />
                        <CommandList>
                          <CommandEmpty>No Person found.</CommandEmpty>
                          <CommandGroup>
                            {customers.map((customer: any) => (
                              <CommandItem
                                value={customer.name}
                                key={customer.name}
                                onSelect={() => {
                                  setValue("customerId", {
                                    _id: customer._id,
                                    name: customer.name,
                                    balance: customer.balance,
                                  });
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    customer.name === field.value.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {customer.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              control={control}
              name="item"
              render={({ field }) => (
                <div className="relative flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="email"
                      className={cn(
                        "text-sm font-normal",
                        getErrorMessage(errors.item) ? "text-red-500" : ""
                      )}
                    >
                      Item
                    </label>
                    {formValue.productQuantity && (
                      <p className="text-sm text-emerald-600">
                        {(formValue.productQuantity).toFixed(1)} Kg*
                      </p>
                    )}
                  </div>

                  <Select onValueChange={handleChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Item" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product: any) => (
                        <SelectItem key={product.name} value={product?.name}>
                          {product?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <div className="grid grid-cols-2 gap-5">
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <CustomInput
                    label="Select Quantity"
                    type="number"
                    className=""
                    disabled={isSubmitting}
                    error={getErrorMessage(errors.quantity)}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              <Controller
                control={control}
                name="supplyRate"
                render={({ field }) => (
                  <CustomInput
                    label="Supply Rate"
                    type="number"
                    className=""
                    disabled={isSubmitting}
                    error={getErrorMessage(errors.supplyRate)}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="received"
              render={({ field }) => (
                <CustomInput
                  label="Received"
                  type="number"
                  className=""
                  disabled={isSubmitting}
                  error={getErrorMessage(errors.phone)}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>
          <div className="flex items-center">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <p>{ButtonAndLabelText}</p>
              )}
            </Button>
          </div>
        </form>
      </div>
        <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
          <InvoiceSide formValue={formValue} />
        </div>
    </div>
  );
};

export default InvoiceForm;
