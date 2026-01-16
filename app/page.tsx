export const dynamic = 'force-dynamic';

import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthComponent from "@/components/AuthComponent";

export default async function RootPage() {
  const user = await getCurrentUser()
  
  return <AuthComponent user={user}/>
    
}
