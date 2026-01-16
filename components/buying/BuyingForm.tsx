"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useState } from "react";
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
import { cn, formatter, getErrorMessage } from "@/lib/utils";
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

const formSchema = z.object({
  broker: z.object({
    id: z.string(),
    name: z.string(),
    dueAmount: z.number(),
  }),
  item: z.string().min(1, { message: "Item name is required" }),
  quantity: z.number().optional(),
  buyingRate: z.number().optional(),
  paidAmount: z.number().optional(),
});

const BuyingForm = ({ brokers }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
    defaultValues: {
      broker: {
        id: "",
        name: "",
        dueAmount: "",
      },
      item: "",
      quantity: "",
      buyingRate: "",
      paidAmount: "",
    },
  });

  const formValue = watch();
  const dueAmount = formValue.broker.dueAmount
  const TotalValue = formValue.quantity * formValue.buyingRate;

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`/api/buying`, data);
      toast.success(`You Buy chicken successfully`);
      router.push("/buying");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Internal server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div className="bg-white/70 rounded-2xl p-8 shadow-card ">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-neutral-800">Create</h1>
          <p className="text-sm text-neutral-900 font-normal">
            Create invoice and save in system
          </p>
        </div>

        <hr className="my-4" />

        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-7">
          <div className="grid grid-cols-1 gap-3">
            <Controller
              control={control}
              name="broker"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor="customer" className="text-sm font-normal">
                    Broker Name
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value.name && "text-muted-foreground"
                        )}
                      >
                        {field.value.name
                          ? brokers?.find(
                              (customer: any) =>
                                customer.name === field.value.name
                            )?.name
                          : "Select Person"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[460px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Person..." />
                        <CommandList>
                          <CommandEmpty>No Person found.</CommandEmpty>
                          <CommandGroup>
                            {brokers?.map((customer: any) => (
                              <CommandItem
                                value={customer.name}
                                key={customer.name}
                                onSelect={() => {
                                  setValue("broker", {
                                    id: customer.id,
                                    name: customer.name,
                                    dueAmount: customer.dueAmount,
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
            <div className="grid gap-3 lg:grid-cols-2 lg:gap-5">
              <Controller
                control={control}
                name="item"
                render={({ field }) => (
                  <div className="relative flex flex-col gap-1">
                    <label
                      htmlFor="email"
                      className={cn(
                        "text-sm font-normal",
                        getErrorMessage(errors.item) ? "text-red-500" : ""
                      )}
                    >
                      Item
                    </label>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broiler">Broiler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <CustomInput
                    label="Select Quantity (Kg)"
                    type="number"
                    className=""
                    disabled={isSubmitting}
                    error={getErrorMessage(errors.quantity)}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Controller
                control={control}
                name="buyingRate"
                render={({ field }) => (
                  <CustomInput
                    label="Buying Rate"
                    type="number"
                    className=""
                    disabled={isSubmitting}
                    error={getErrorMessage(errors.supplyRate)}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              <CustomInput
                label="Total Amount"
                type="text"
                value={formatter.format(TotalValue)}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <CustomInput
                label="Due Amount"
                type="text"
                value={formatter.format(dueAmount)}
              />
              <Controller
                control={control}
                name="paidAmount"
                render={({ field }) => (
                  <CustomInput
                    label="Paid Amount"
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
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <p>Created</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyingForm;
