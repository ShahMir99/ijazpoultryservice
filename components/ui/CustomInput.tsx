import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  isPasswordField ? : boolean;
  showPassword?: boolean;
  onClick?: () => void;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  className,
  disabled,
  isPasswordField,
  showPassword,
  onClick,
  error,
  ...props
}) => {

  return (
    <div className="relative flex flex-col gap-1">
      <label
        htmlFor="email"
        className={cn(
          "text-sm font-normal",
          error ? "text-red-500" : ""
        )}
      >
        {label}
      </label>
      <input
        type={type}
        disabled={disabled}
        autoComplete="off"
        className={cn(
          "p-2 border border-neutral-200 text-sm rounded-lg outline-none ",
          error
            ? " ring-2 focus:ring-offset-2 ring-red-500"
            : "focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        )}
        {...props}
      />
      {isPasswordField &&
        (showPassword ? (
          <EyeOff
            onClick={onClick}
            className="w-5 h-5 stroke-[1px] text-neutral-800 absolute right-4 top-9 cursor-pointer"
          />
        ) : (
          <Eye
            onClick={onClick}
            className="w-5 h-5 stroke-[1px] text-neutral-800 absolute right-4 top-9 cursor-pointer"
          />
        ))}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default CustomInput;
