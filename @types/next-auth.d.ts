import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            id: string
            img: string | null
            isAdmin: boolean
            user_name: string
            company_document: string
            document: string | null
            isClient: boolean
            permissions: string[]
            user_code: string
            email: string | null
            function: string | null
            token: string

        }
    }
}