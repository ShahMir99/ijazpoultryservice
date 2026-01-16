"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomInput from "../ui/CustomInput";
import { getErrorMessage } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  quantity: z.number().min(0, { message: "quantity is required" }),
  govtRate: z.number().optional(),
  buyingRate: z.number().optional(),
});

const ProductForm = ({ product }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: "",
      quantity: "",
      govtRate: "",
      buyingRate: "",
    },
  });

  const productLabel = product ? "Updated" : "Created";
  const ButtonLabel = product ? "Save changes" : "Create";

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (product) {
        await axios.patch(`/api/products/update`, data);
      } else {
        await axios.post(`/api/products`, data);
      }
      router.refresh();
      toast.success(`Product ${productLabel} Successfully`);
    } catch (err : any) {
      console.log(err.response);
      toast.error(err.response.data || "Internal Server Error"); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <CustomInput
              label="Name"
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
          name="quantity"
          render={({ field }) => (
            <CustomInput
              label="Quantity (Kg)"
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
          name="buyingRate"
          render={({ field }) => (
            <CustomInput
              label="Buying Rate"
              type="number"
              className=""
              disabled={isSubmitting}
              error={getErrorMessage(errors.buyingRate)}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller
          control={control}
          name="govtRate"
          render={({ field }) => (
            <CustomInput
              label="Govt Rate"
              type="number"
              className=""
              disabled={isSubmitting}
              error={getErrorMessage(errors.govtRate)}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            ButtonLabel
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
