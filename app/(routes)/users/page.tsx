export const dynamic = 'force-dynamic';

import { getAllUser } from '@/actions/getAllUsers'
import { getCurrentUser } from '@/actions/getCurrentUser';
import UserClient from '@/components/Users/UserClient'
import { UserColumn } from '@/types';

const UserPage = async () => {
  const users = await getAllUser()
  const user = await getCurrentUser();

  const formattedData : UserColumn[] = users?.map((user) => ({
    id : user._id,
    name : user.name,
    image : user?.image,
    type : user.userType
  })) ?? []

  return (
    <div className="p-5 flex flex-col gap-3">
      <UserClient user={user} formattedData={formattedData}/> 
    </div>
  )
}

export default UserPage