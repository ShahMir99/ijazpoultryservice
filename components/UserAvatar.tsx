import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  username: string;
  role: string;
  image: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ username, image, role }) => {
  return (
    <div className="flex items-center gap-3">
      {/* <Image
        width={40}
        height={40}
        src={image || "/images/my Dp.jpg"}
        alt=""
        className="rounded-full overflow-hidden object-cover shrink-0 cursor-pointer"
      /> */}
      <Avatar>
        <AvatarImage src={image}/>
        <AvatarFallback className="bg-white">{username?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-sm font-bold text-neutral-800">{username}</h2>
        <h2 className="text-xs font-medium text-gray-600  capitalize">{role}</h2>
      </div>
    </div>
  );
};

export default UserAvatar;
