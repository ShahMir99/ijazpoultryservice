"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface MenuItemsProps {
  label?: string;
  href: string;
  Icon: IconType;
  isActive: boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  label,
  href,
  Icon,
  isActive,
}) => {
  return (
    <li
    
      className={cn(
        "group w-full rounded-xl ",
        isActive
          ? " shadow-card bg-blue-600 hover:bg-blue-600/90 text-white hover:text-white"
          : " hover:bg-black/10 text-zinc-500 hover:text-neutral-800",
      )}
    >
      <Link
        href={href}
        className="flex items-center justify-start gap-3 py-4 px-5"
      >
        <Icon className="h-5 w-5 shrink-0" />
        <p className="text-sm capitalize font-medium tracking-wide">{label}</p>
      </Link>
    </li>
  );
};

export default MenuItems;
