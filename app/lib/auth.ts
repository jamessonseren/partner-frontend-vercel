
import { setupAPIClient } from "@/app/services/api"
import { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "./auth.config";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                company_document: { label: 'cnpj', type: 'text' },
                user_name: { label: 'user_name', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const api = await setupAPIClient()
                try {

                    const response = await api.post("/company-user-login", {
                        company_document: credentials?.company_document,
                        user_name: credentials?.user_name,
                        password: credentials?.password
                    })
                    const user = await response.data
                    console.log({user})

                    if (user) {
                        return user
                    }

                    return null
                } catch (err) {
                    // await signOut({
                    //     redirect: false
                    // })
                    // router.replace('/')
                    console.log({ err })
                    return
                }
            }

        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {

            user && (token.user = user)

            return token
        },
        session: async ({ session, token }: any) => {

            session.user = token.user as any
            return session
        },
        ...authConfig
    }
})

