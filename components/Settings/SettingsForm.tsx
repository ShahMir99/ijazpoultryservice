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
  name: z.string().min(1),
  email: z.string().email().min(1),
  address: z.string().optional(),
  phone: z.string().optional(),
});

const SettingsForm = ({ user }: { user: any }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.patch(`/api/user/${user._id}`, data);
      router.refresh();
      toast.success("Data Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.success("Internal server Error");
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
          name="email"
          render={({ field }) => (
            <CustomInput
              label="Email"
              type="text"
              className=""
              disabled={isSubmitting}
              error={getErrorMessage(errors.email)}
              {...field}
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
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
