import { NextAuthConfig } from "next-auth"
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export const authConfig = {
    providers: [],
    pages: {
        signIn: '/'
    },
    callbacks: {
        jwt: async ({ token, user, trigger, session,account, profile }) => {
            if(trigger === "signIn"){
                console.log("caiu em signIng")
                user && (token.user = user)
    
                return token
    
            }
            if(trigger === "update" && session){
                token.user = session.user
                return {...token, ...session.user}
            }
            // user && (token.user = user)
            // console.log("user jwt: ", user)

            return token
        },
        session: async ({ session, token}: any) => {
            session.user = token.user


            return session
        },
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const session = auth?.user

            const isOnLoginPage = nextUrl.pathname.startsWith("/");
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const userSettingsPage = nextUrl.pathname.startsWith("/dashboard/settings/user")
            const financeUser = nextUrl.pathname.startsWith("/dashboard/finances")
            const salesUser = nextUrl.pathname.startsWith("/sales")
            const marketing = nextUrl.pathname.startsWith("/marketing")

            if(!isLoggedIn) return false

            if (isOnLoginPage && isLoggedIn && !isOnDashboard) {
                    
                    return NextResponse.redirect(new URL("/dashboard", nextUrl));              
                }
            if ((isLoggedIn && session?.status === 'pending_password') && !userSettingsPage) {
               
                return NextResponse.redirect(new URL('/dashboard/settings/user', nextUrl));
            }
            
          
            return true
        },

    }
} satisfies NextAuthConfig;
