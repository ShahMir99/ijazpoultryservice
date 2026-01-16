"use client";

import { UserTypes } from "@/enums";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthComponent = ({ user }: any) => {
  const router = useRouter(); 

  useEffect(() => {
    if (!user || !user?.email) {
      return router.push("/login");
    }

    if (user?.userType === UserTypes.SUPERADMIN) {
      return router.push("/analytics");
    }

    if (user?.userType !== UserTypes.SUPERADMIN) {
      return router.push("/invoices");
    }
  }, [router, user]);

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <svg
        className="animate-spin h-6 w-6 text-neutral-900 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <span className="text-neutral-900 text-xl font-medium">Loading...</span>
    </div>
  );
};

export default AuthComponent;
