"use client";

import Image from "next/image";
import React from "react";
import MenuItems from "./MenuItems";
import useRoutes from "@/hooks/useRoutes";

import { RiLogoutCircleLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { UserTypes } from "@/enums";

interface DesktopSideBarProps {
  user: any;
}

const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ user }) => {
  const  routes  = useRoutes();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 left-0 lg:p-5 overflow-y-auto lg:w-[300px] lg:flex lg:flex-col justify-between bg-slate-100">
      <div>
        <div className="relative flex items-center justify-start gap-1">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="brightness-50"
          />
          <div className="flex items-center flex-col">
            <h2 className="text-xl font-bold text-neutral-950">Ijaz Poultry</h2>
            <p className="text-neutral-900 text-sm font-semibold">
              Supply Service
            </p>
          </div>
        </div>
        <nav className="mt-14">
            <ul role="list" className="flex flex-col space-y-0.5">
              {routes.map((route) => (
                <MenuItems
                  key={route.label}
                  label={route.label}
                  href={route.href}
                  Icon={route.icon}
                  isActive={route.isActive!}
                  // disabled={user.userType !== route.adminRoute}
                />
              ))}
            </ul>
        </nav>
      </div>
      <div
        className="group w-full rounded-xl  cursor-pointer flex items-center justify-start gap-3 py-4 px-5 hover:bg-black/10 text-neutral-600 hover:text-neutral-900"
        onClick={() => signOut()}
      >
        <RiLogoutCircleLine className="h-5 w-5" />
        <h4 className="text-sm capitalize font-semibold tracking-wide">
          Log Out
        </h4>
      </div>
    </div>
  );
};

export default DesktopSideBar;
