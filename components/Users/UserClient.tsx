"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { UserTypes } from "@/enums";
import {UserClientProps} from "@/types";

const UserClient: React.FC<UserClientProps> = ({ user, formattedData }) => {

  const router = useRouter();
  useEffect(() => {
    if (!user?.email || user?.userType !== UserTypes.SUPERADMIN) {
      signOut();
    }
  }, [user?.email, user?.userType]);

  return (
    <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-800">
            Software users
          </h1>
          <p className="text-base text-neutral-900 font-normal">
            Manage users and their role
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-3 bg-blue-500 text-white"
          onClick={() => router.push("/users/new")}
        >
          <p className="text-sm">Add User</p>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <hr className="my-7" />
      <DataTable data={formattedData} columns={columns} />
    </div>
  );
};

export default UserClient;
