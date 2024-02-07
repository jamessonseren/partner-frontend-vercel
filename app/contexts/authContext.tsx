'use client'

import { ReactNode } from "react"
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

type AuthContextData = {
    user: UserProps
    setUser: Dispatch<SetStateAction<UserProps>>
}

type UserProps = {
    uuid: string
    is_admin: boolean
}
type AuthProviderProps = {
    children: ReactNode;

}


const userDefaultValue:UserProps = {
    uuid: '',
    is_admin: false
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>(userDefaultValue)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)