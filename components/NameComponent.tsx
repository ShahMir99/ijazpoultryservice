"use client";

import { useRouter } from "next/navigation";

const NameComponent = ({ title, original }: any) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/${title}/view/${original._id}`)}>
      <div>{original?.name}</div>
    </button>
  );
};

export default NameComponent;
