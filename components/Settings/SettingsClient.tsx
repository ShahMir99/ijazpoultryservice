"use client";
import { useEffect } from "react";
import PasswordForm from "./PasswordForm";
import SettingsForm from "./SettingsForm";
import { signOut } from "next-auth/react";
import { UserTypes } from "@/enums";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductForm from "./ProductForm";

const SettingsClient = ({ user, product }: any) => {
  useEffect(() => {
    if (!user?.email || user?.userType === UserTypes.USER) {
      signOut();
    }
  }, [user?.email, user?.userType]);

  return (
    <>
      <Tabs defaultValue="account">
        <TabsList className="bg-white">
          <TabsTrigger value="account" className="w-[120px] lg:w-[200px]">
            Account
          </TabsTrigger>
          <TabsTrigger value="products" className="w-[120px] lg:w-[200px]">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className=" flex flex-col gap-3">
          <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-neutral-800">
                Information
              </h1>
              <p className="text-sm text-neutral-900 font-normal">
                Manage you Personal Information
              </p>
            </div>
            <hr className="my-7" />
            <SettingsForm user={user} />
          </div>
          <div className="bg-white/70 rounded-2xl p-5 shadow-card">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-neutral-800">
                Password
              </h1>
              <p className="text-sm text-neutral-900 font-normal">
                Update password
              </p>
            </div>
            <hr className="my-7" />
            <PasswordForm user={user} />
          </div>
        </TabsContent>
        <TabsContent value="products">
          <div className="bg-white/70 rounded-2xl p-5 shadow-card ">
          <ProductForm product={product}/>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsClient;
