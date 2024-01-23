import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            uuid: string
            img: string | null
            user_name: string
            is_client: boolean
            is_admin: boolean
            is_active: boolean
            business_document: string
            admin_document: string | null
            permissions: string[]
            email: string | null
            function: string | null
            token: string

        }
    }
}