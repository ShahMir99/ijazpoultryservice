"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Eye, EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Should be a valid email" }),
  password: z.string().min(4, { message: "Password is required" }),
  keepMeLogin: z.boolean().default(false).optional(),
});

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      keepMeLogin: false,
    },
  });

  const togglePassword = () => {
    setShowPassword((state) => !state);
  };

  const OnSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsSubmitting(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Login Successfully");
          router.push("/");
          router.refresh();
        }

        if (callback?.error) {
          toast.error(callback?.error);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full h-full md:w-[40%] pt-10 px-4 flex flex-col gap-5">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-800 lg:text-left text-center">
          Sign In
        </h1>
        <p className="text-base font-normal text-gray-500 lg:text-left text-center">
          Enter your email and password to sign in!
        </p>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)} className="space-y-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-base font-normal">
            Email*
          </label>
          <input
            type="text"
            disabled={isSubmitting}
            autoFocus
            autoComplete="off"
            className={cn(
              "p-3 border border-zinc-400/70 rounded-lg outline-none ",
              errors.email
                ? "focus:border-0 border-0 ring-2 ring-red-400"
                : "focus:border-0 focus:ring-2 focus:ring-blue-600"
            )}
            {...register("email")}
          />

          {errors.email && typeof errors.email.message === "string" && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-base font-normal">
            Password<span className="text-blue-600">*</span>
          </label>
          <input
            id="password"
            disabled={isSubmitting}
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            className={cn(
              "p-3 border border-zinc-400/70 rounded-lg outline-none ",
              errors.password
                ? "focus:border-0 border-0 ring-2 ring-red-400"
                : "focus:border-0 focus:ring-2 focus:ring-blue-600"
            )}
            {...register("password")}
          />
          {showPassword ? (
            <EyeOff
              onClick={togglePassword}
              className="w-6 h-6 stroke-[1px] text-neutral-800 absolute right-4 top-11 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={togglePassword}
              className="w-6 h-6 stroke-[1px] text-neutral-800 absolute right-4 top-11 cursor-pointer"
            />
          )}

          {errors.password && typeof errors.password.message === "string" && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Checkbox
            disabled={isSubmitting}
            className="data-[state=checked]:bg-blue-700"
            onCheckedChange={(e) => setValue("keepMeLogin", e)}
          />
          <p className="text-sm text-neutral-700">Keep me logged in</p>
        </div>
        <div>
          <Button
            className="w-full text-base p-6 rounded-xl mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
      <div className="flex-1" />
      <div className=" text-sm font-medium text-neutral-500 text-center">
        © 2024 Umer Poultry Supplt Service. All Rights Reserved
      </div>
    </div>
  );
};

export default LoginForm;
