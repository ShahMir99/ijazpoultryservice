import React from "react";
import UserForm from "@/components/Users/UserForm";
import { getUserById } from "@/actions/getUserById";

interface UserIdPageProps {
  userId: string;
}

const UserIdPage = async ({ params }: { params: UserIdPageProps }) => {
  const user = await getUserById(params.userId);
  return (
    <div className="p-5 flex flex-col gap-3">
      <UserForm initialData={user} />
    </div>
  );
};

export default UserIdPage;
