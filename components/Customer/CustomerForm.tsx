"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1,{ message: "Name is required" }),
  balance: z.number(),
  address: z.string().min(1,{ message: "Address is required" }),
  phone: z.string().min(1,{ message: "Phone is required" }),
});

const CustomerForm = ({ initialData }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      balance: "",
      address: "",
      phone: ""
    },
  });

  const actionsButton = initialData ? "Save changes" : "Create";
  const actionsTitle = initialData ? "Update" : "Create";

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if(initialData){
        await axios.patch(`/api/customers/${initialData?._id}`, {...data, isSync : false});
      }else{
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
    <>
    
      <div className="bg-white/70 rounded-2xl p-5 shadow-card">
        <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-neutral-800">
            {actionsTitle}
          </h1>
          <p className="text-sm text-neutral-900 font-normal">
            {actionsTitle} customer in your system
          </p>
        </div>
        <hr className="my-7" />

        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-5">
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-5">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  label="Customer name :"
                  type="text"
                  className=""
                  disabled={isSubmitting}
                  error={getErrorMessage(errors.name)}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="balance"
              render={({ field }) => (
                <CustomInput
                  label="Customer Balance"
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
              name="address"
              render={({ field }) => (
                <CustomInput
                  label="Address"
                  type="text"
                  className=""
                  disabled={isSubmitting}
                  error={getErrorMessage(errors.address)}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <CustomInput
                  label="Phone No."
                  type="text"
                  className=""
                  disabled={isSubmitting}
                  error={getErrorMessage(errors.phone)}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <p>{actionsButton}</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
