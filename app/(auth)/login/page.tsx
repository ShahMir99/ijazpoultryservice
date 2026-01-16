export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/getCurrentUser"
import LoginForm from "@/components/LoginForm"

const LoginPage = async () => {

  const user = await getCurrentUser()

  if(user?.email){
    return redirect("/")
  }

  return (
    <div className="w-full h-full py-5 px-10 md:py-6 md:px-24">
        <LoginForm />
    </div>
  )
}

export default LoginPage