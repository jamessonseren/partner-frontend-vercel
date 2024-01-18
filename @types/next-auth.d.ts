import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            id: string
            roles: boolean
            user_name: string
            cnpj: string
            isClient: boolean
            permissions: string
            user_code: string
            token: string

        }
    }
}