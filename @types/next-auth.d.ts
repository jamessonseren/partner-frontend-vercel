import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            id: string
            isAdmin: boolean
            user_name: string
            company_document: string
            isClient: boolean
            permissions: string
            user_code: string
            token: string

        }
    }
}