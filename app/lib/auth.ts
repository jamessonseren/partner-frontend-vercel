
import { setupAPIClient } from "@/app/services/api"
import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "./auth.config";
import { fetchCompanyUserDetails } from "./actions";


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
                business_document: { label: 'business_document', type: 'text' },
                user_name: { label: 'user_name', type: 'text' },
                email: { label: 'email', type: 'text'},
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const api = await setupAPIClient()
                try {

                    const response = await api.post("/company-user-login", {
                        business_document: credentials.business_document,
                        email: credentials.email,
                        user_name: credentials?.user_name,
                        password: credentials?.password
                    })
                    const user = await response.data

                    if (user) {

                        return user
                    }

                    return null
                } catch (err) {
                    
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
            // const userData = await fetchCompanyUserDetails()

            
            session.user = token.user
            
            return session
        },
        ...authConfig
    }
})

