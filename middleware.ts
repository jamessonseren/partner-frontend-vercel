// import { NextRequest, NextResponse, } from 'next/server'
// import { redirect, useRouter } from 'next/navigation'
// import { auth } from './app/lib/auth'
import { authConfig } from './app/lib/auth.config'
import NextAuth from 'next-auth'


// const protectedRoutes = ["/dashboard"]
// const notClientRoutes = ["/dashboard/settings"]
// const isOnLoginPage = ["/"] 



// export default async function middleware(request: NextRequest) {
   
//   const user = await auth()
//    console.log({user})

// //    console.log(user?.isClient)
   
//    const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/dashboard")
//    const notClient = request.nextUrl?.pathname.startsWith("/dashboard/settings")
//    const financeUser = request.nextUrl?.pathname.startsWith("/dashboard/finances")
//    const salesUser = request.nextUrl?.pathname.startsWith("/sales")
//    const marketing = request.nextUrl?.pathname.startsWith("/marketing")
//    console.log("admin panel: ",isOnAdminPanel)


//    //ONLY ADMIN CAN REACH
// //    if(!user?.isClient && isOnAdminPanel){
// //     redirect('/')
// //    }

  

// //    if (!user?.isClient && protectedRoutes.includes(request.nextUrl.pathname)) {
// //     const absoluteUrl = new URL("/", request.nextUrl.origin)
// //     // console.log({absoluteUrl})
// //     return NextResponse.redirect(`/dashboard/settings`)
// // }

// //    if(user.roles.includes('admin')){
// //     return false
// //    }
   
//}

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

