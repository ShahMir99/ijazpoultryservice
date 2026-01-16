import { type ClassValue, clsx } from "clsx"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});


export const getErrorMessage = (error:any) => {
  if(error && typeof error.message === "string"){
    return error.message
  }
}