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

const formSchema = z.object({
  customer: z.object({
    id: z.string(),
    name: z.string(),
  }),
  item: z.string().min(1, { message: "Item name is required" }),
  quantity: z.number().min(1, { message: "quantity is required" }),
  supplyRate: z.number().min(1, { message: "supply Rate is required" }),
  received: z.number().optional(),
});

const FormSide = ({ initialData, customers }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      customer: {
        id: "",
        name: "",
      },
      item: "",
      quantity: "",
      supplyRate: "",
      received: "",
    },
  });

  const actionsButton = initialData ? "Save changes" : "Generate";
  const actionsTitle = initialData ? "Update" : "Generate";

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        await axios.patch(`/api/customers/${initialData?._id}`, data);
      } else {
        await axios.post(`/api/customers`, data);
      }
      toast.success(`Customer ${actionsTitle} Successfully`);
      router.push("/customers");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Internal server Error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-neutral-800">
          {actionsTitle}
        </h1>
        <p className="text-sm text-neutral-900 font-normal">
          {actionsTitle} invoice and save in system
        </p>
      </div>

      <hr className="my-4" />

      <form onSubmit={handleSubmit(OnSubmit)} className="space-y-7">
        <div className="grid grid-cols-1 gap-3">
          <Controller
            control={control}
            name="customer"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className={cn("text-sm font-normal")}>
                  Select Name
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
                        ? customers.find(
                            (customer: any) =>
                              customer.name === field.value.name
                          )?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[460px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer: any) => (
                            <CommandItem
                              value={customer.id}
                              key={customer.id}
                              onSelect={() => {
                                setValue("customer", {
                                  id: customer.id,
                                  name: customer.name,
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
                <label
                  htmlFor="email"
                  className="text-base font-normal text-neutral-900"
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
                  error={getErrorMessage(errors.balance)}
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
                  error={getErrorMessage(errors.address)}
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
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <p>{actionsButton}</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSide;
