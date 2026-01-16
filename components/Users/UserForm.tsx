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
import { cn, getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
  address: z.string().optional(),
  phone: z.string().optional(),
  userType: z.string().optional(),
});

const UserForm = ({ initialData }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      email: "",
      password: "",
      address: "",
      phone: "",
      userType: "",
    },
  });

  const actionsButton = initialData ? "Save changes" : "Create";
  const actionsTitle = initialData ? "Update" : "Create";

  const OnSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if(initialData){
        await axios.patch(`/api/user/${initialData?._id}`, data);
      }else{
        await axios.post(`/api/auth/register`, data);
      }
      toast.success(`User ${actionsTitle} Successfully`);
      router.push("/users");
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
            {actionsTitle} in your system
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
              name="password"
              render={({ field }) => (
                <CustomInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  className=""
                  onClick={() => setShowPassword((state) => !state)}
                  isPasswordField
                  disabled={isSubmitting}
                  error={getErrorMessage(errors.password)}
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
            <Controller
              control={control}
              name="userType"
              render={({ field }) => (
                <div className="relative flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-base font-normal text-neutral-900"
                  >
                    User Type
                  </label>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

export default UserForm;
