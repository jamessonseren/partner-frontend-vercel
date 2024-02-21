'use client'

import { signOut } from "next-auth/react"
import router from "next/router"
import { ReactNode } from "react"
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

type AuthContextData = {
    user: UserProps
    setUser: Dispatch<SetStateAction<UserProps>>
    logOut: () => void
}

type UserProps = {
    uuid: string
    is_admin: boolean
}
type AuthProviderProps = {
    children: ReactNode;

}

export async function logOut() {
    await signOut({
        redirect: false
    })
    localStorage.removeItem('passwordAttempts');

    router.replace('/')
}

const userDefaultValue:UserProps = {
    uuid: '',
    is_admin: false
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>(userDefaultValue)

    return (
        <AuthContext.Provider value={{user, setUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)