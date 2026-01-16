import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import TopBar from "./TopBar";
import { getCurrentUser } from "@/actions/getCurrentUser";
import MobileSideBar from "./MobileSideBar";

const SideBar = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  return (
    <div className="w-full h-full">
        <DesktopSideBar user={user}/>
        <MobileSideBar user={user}/>
        <TopBar />
      <main className="h-full pl-[80px] lg:pl-[300px] lg:pt-24"> {children}</main>
    </div>
  );
};

export default SideBar;
