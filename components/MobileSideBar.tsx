"use client";

import Image from "next/image";
import React from "react";
import MenuItems from "./MenuItems";
import useRoutes from "@/hooks/useRoutes";

import { RiLogoutCircleLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { UserTypes } from "@/enums";

interface MobileSideBarProps {
  user: any;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({ user }) => {
  const  routes  = useRoutes();

  return (
    <div className="lg:hidden fixed inset-y-0 left-0 p-2 lg:p-5 overflow-y-auto w-[80px] flex flex-col justify-between bg-white z-50">
      <div>
        <nav className="mt-8">
            <ul role="list" className="flex flex-col space-y-0.5">
              {routes.map((route) => (
                <MenuItems
                  key={route.label}
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
        <h4 className="hidden lg:block text-sm capitalize font-semibold tracking-wide">
          Log Out
        </h4>
      </div>
    </div>
  );
};

export default MobileSideBar;
