
import { setupAPIClient } from "@/app/services/api"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export interface DecodedToken {
    sub: string
    permissions: string[]
    roles: string[]
    client_admin: boolean
}

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                cnpj: { label: 'cnpj', type: 'text' },
                user_name: { label: 'user_name', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                const api = await setupAPIClient()
                try {

                    const response = await api.post("/company-user-login", {
                        cnpj: credentials?.cnpj,
                        user_name: credentials?.user_name,
                        password: credentials?.password
                    })
                    const user = await response.data


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
    pages: {
        signIn: '/'
    },
    callbacks: {
        jwt: async ({ token, user }) => {

            user && (token.user = user)

            return token
        },
        session: async ({ session, token }) => {

            session.user = token.user as any
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }