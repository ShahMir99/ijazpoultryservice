import {withAuth} from "next-auth/middleware"

export default withAuth({
    pages : {
        signIn : "/login"
    }
})

export const config = {
    matcher : [
        "/analytics/:path*",
        "/invoices/:path*",
        "/customers/:path*",
        "/users/:path*",
        "/settings/:path*",
    ]
}