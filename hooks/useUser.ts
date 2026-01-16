"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const session = useSession()
  
  useEffect(() => {
    if(session.status === "authenticated"){
        setUserRole(session?.data?.user?.userType)
    }
  }, [session]);

  return userRole;
};