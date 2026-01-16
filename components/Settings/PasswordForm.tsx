"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";

import * as z from "zod";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    password: z.string().min(1),
    confirmPass: z.string().min(1),
  })
  .refine(
    (value) => {
      return value.password === value.confirmPass;
    },
    {
      message: "Password and Confirm Password Should be same",
      path: ["password"],
    }
  );

type setState = React.Dispatch<React.SetStateAction<boolean>>;

const PasswordForm = ({user} : any) => {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setShowConfirmPass] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPass: "",
    },
  });

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.patch(`/api/user/${user._id}`, {password : data.password});
      router.refresh();
      toast.success("Password Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.success("Internal server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePassword = (setState: setState) => {
    setState((state) => !state);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <CustomInput
              label="Password"
              type={showPassword ? "text" : "password"}
              className=""
              isPasswordField
              disabled={isSubmitting}
              showPassword={showPassword}
              onClick={() => togglePassword(setShowPassword)}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPass"
          render={({ field }) => (
            <CustomInput
              label="Confirm Password"
              type={confirmPass ? "text" : "password"}
              className=""
              disabled={isSubmitting}
              isPasswordField
              showPassword={confirmPass}
              onClick={() => togglePassword(setShowConfirmPass)}
              {...field}
            />
          )}
        />
      </div>
      <div className="">
        {
          <span className="mt-5 text-red-500 text-sm">
            {getErrorMessage(errors.password)}
          </span>
        }
      </div>
      <div className="flex items-center justify-end">
      <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Update Password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
