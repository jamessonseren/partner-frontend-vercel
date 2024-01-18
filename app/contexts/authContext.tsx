// import { destroyCookie, parseCookies, setCookie } from "nookies"
// import { ReactNode, createContext, useEffect, useState } from "react"
// import { jwtDecode } from "jwt-decode"
// import { api } from "../services/apiClient"
// import Router  from "next/router"

// type AuthContextData = {
//     user: UserProps,
//     isAuthenticated: boolean,
//     signIn: (credentials: SignInProps) => Promise<void>,
//     signOut: () => void,
// }

// type UserProps = {
//     id: string,
//     user_name: string,
//     cnpj: string,
//     roles: string[],
//     permissions: string[],
//     client_admin: boolean
// }

// type SignInProps = {
//     cnpj: string,
//     userName: string
//     password: string
//     permissions: string[]
// }

// type AuthProviderProps = {
//     children: ReactNode

// }

// export interface DecodedToken {
//     sub: string
//     permissions: string[]
//     roles: string[]
//     client_admin: boolean
// }

// export const AuthContext = createContext({} as AuthContextData)

// export async function signOut() {
//     try {

//         destroyCookie(undefined, '@nextauth.token')

//         delete api.defaults.headers['Authorization'];

        
//         Router.push('/')
//     } catch {
//         console.log("erro ao deslogar")
//     }
// }

// export function AuthProvider({ children }: AuthProviderProps) {

//     const [user, setUser] = useState<UserProps>({ id: '', user_name: '', cnpj: '', permissions: [], client_admin: false, roles: [] })

//     const isAuthenticated = !!user

//     useEffect(() => {

//         //pegar dados no cookie
//         const { '@nextauth.token': token } = parseCookies()

//         async function getUserDetails() {

//             try {

//                 const response = await api.get('/company-user-details')

//                 const data: UserProps = response.data

//                 setUser({
//                     id: data.id,
//                     user_name: data.user_name,
//                     cnpj: data.cnpj,
//                     roles: data.roles,
//                     permissions: data.permissions,
//                     client_admin: data.client_admin
//                 });



//             } catch (err) {

//                 console.log("Error in requesting company user details")
//                 signOut()
//             }

//         }

//         if (token) {
            
//             getUserDetails()

//         }

//     }, [])

//     async function signIn({ cnpj, userName, password }: SignInProps) {


//         try {
//             const response = await api.post('/company-user-login', {
//                 cnpj: cnpj,
//                 user_name: userName,
//                 password: password
//             })

//             const token = response.data

//             setCookie(undefined, '@nextauth.token', token, {
//                 maxAge: 60 * 60 * 24 * 30, // expires in one month
//                 path: "/"
//             })

//             const decodedToken = jwtDecode(token) as DecodedToken

            
//             setUser({
//                 id: decodedToken.sub,
//                 permissions: decodedToken.permissions,
//                 roles: decodedToken.roles,
//                 cnpj,
//                 user_name: userName,
//                 client_admin: decodedToken.client_admin
//             })

            
//             //Passar para próximas requisições o token
//             api.defaults.headers['Authorization'] = `Bearer ${token}`

//             // toast.success("Login realizado com sucesso")
//             //Redirecionar o usuário para proxima página
//             Router.push('/dashboard')


//         } catch (err: any) {
//             alert("Falha no Login")
//             console.error("Login Error: ", err)

//             if(err.response.data.error === "Incorrect username/password"){
//                 alert("Credenciais incorretas")
//             }
           
//         }
//     }



//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


