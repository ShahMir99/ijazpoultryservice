import React from "react";
import { Search } from "lucide-react";

import UserAvatar from "./UserAvatar";
import { getCurrentUser } from "@/actions/getCurrentUser";

const TopBar = async () => {
  const user = await getCurrentUser()
  return (
    <div className="hidden lg:block z-10 lg-calc-width lg:fixed lg:top-0 lg: right-0 overflow-hidden lg:pt-8 lg:px-8 lg:pb-4 lg:bg-slate-100">
      <div className="flex items-center justify-start gap-2 w-full">
        <Search className="w-5 h-5 text-zinc-500 stroke-[1.5px]" />
        <input
          type="text"
          placeholder="Tap to search"
          className="flex-1 p-2 text-sm rounded-lg outline-none focus:ring-0 bg-transparent placeholder:text-sm placeholder:text-neutral-600 placeholder:font-normal"
        />
        <UserAvatar username={user?.name} role={user?.userType} image={user?.image} />
      </div>
      
    </div>
  );
};

export default TopBar;
