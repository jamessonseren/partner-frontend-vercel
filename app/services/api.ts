'use server'

import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";
import { cookies } from 'next/headers'
import { auth } from "../lib/auth";
import logOut from "../contexts/authContext";
import { redirect } from "next/navigation";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { NextResponse } from "next/server";

const baseURL = 'https://api-correct-vercel.vercel.app/'
//const baseURL = 'http://localhost:3333'

let redirectPath: string | null = null
// const signOut = async () => {

//     try {
//         const signOut = await fetch('http://localhost:3000/api/auth/signout?callbackUrl=/api/auth/session', {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: await fetch('http://localhost:3000/api/auth/csrf').then((rs) => rs.text())
//         });

//         if (signOut.ok) {
//             console.log('sucesso')
//             redirectPath = '/'

            
//         } else {
//             console.log("erro em signout")
            
//         }

//     } catch (err: any) {
//         console.log('logout error', err)
//     }
//     finally{
//         if(redirectPath){
//             redirect(redirectPath)
//         }
//     }
// }

export async function setupAPIClient(ctx = {}) {

    const session = await auth()
    if (session?.expires) { }
    const api = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    })
    api.interceptors.response.use(response => {

        return response
    }, async (error: AxiosError) => {
        //console.log("error axios: ", error)
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                console.log("**************caiu aqui 1*************")


                // try {

                //     const signOut = await fetch('http://localhost:3000/api/auth/signout?callbackUrl=/api/auth/session', {
                //         method: "POST",
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json',
                //           },
                //         body: await fetch('http://localhost:3000/api/auth/csrf').then((rs) => rs.text())
                //       });

                //     if(signOut.ok){
                //         console.log('sucesso')
                //     }else{
                //         console.log("erro")
                //     }

                // } catch (err: any) {
                //     console.log('logout error', err)
                // }
              
                //return Promise.reject(new AuthTokenError)

            }
            else {
                console.log('caiu aqui 2')
                return Promise.reject(new AuthTokenError)
            }


        }

        return Promise.reject(error)
    })

    return api
}