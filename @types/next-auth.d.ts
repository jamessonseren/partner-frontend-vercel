import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            uuid: string
            business_info_id: string
            is_admin: boolean
            document: string | null
            user_name: string
            email: string | null
            img: string | null
            permissions: string[]
            function: string | null
            token: string

        }
    }
}