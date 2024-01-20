import { NextRequest, NextResponse, } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { redirect, useRouter } from 'next/navigation'


const protectedRoutes = ["/dashboard"]
const notClientRoutes = ["/dashboard/settings"]
const isOnLoginPage = ["/"] 

export default async function middleware(request: NextRequest) {
    const baseURL = 'http://localhost:3000'
   
   const token = await getToken({
    req: request
   })
   const user = token?.user as any

//    console.log(user?.isClient)
   
   const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/dashboard")
   const notClient = request.nextUrl?.pathname.startsWith("/dashboard/settings")
   const financeUser = request.nextUrl?.pathname.startsWith("/dashboard/finances")
   const salesUser = request.nextUrl?.pathname.startsWith("/sales")
   const marketing = request.nextUrl?.pathname.startsWith("/marketing")
   console.log("admin panel: ",isOnAdminPanel)
   //ONLY ADMIN CAN REACH
//    if(!user?.isClient && isOnAdminPanel){
//     redirect('/')
//    }

   if(!token && isOnAdminPanel){
    return NextResponse.redirect(`${baseURL}`)

   }

   if (!user?.isClient && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", request.nextUrl.origin)
    // console.log({absoluteUrl})
    return NextResponse.redirect(`${baseURL}/dashboard/settings`)
}

//    if(user.roles.includes('admin')){
//     return false
//    }
   
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  };
