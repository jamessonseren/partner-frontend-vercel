import axios, { AxiosError } from "axios";

import { AuthTokenError } from "./errors/AuthTokenError";
import { getSession, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

// import { signOut } from "../contexts/authContext";

export async function setupAPIClient(ctx = {}) {
   const cookieStore = cookies()
   const session = await getServerSession(nextAuthOptions)
   console.log("session: ", session?.user.token)
   

   let cookie = cookieStore.get('next-auth.session-token')?.value
     

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        //baseURL: 'https://vercel-correct-backend.vercel.app',
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    })
    api.interceptors.response.use(response => {

        // console.log("response interceptor: ", response)
        return response
    }, async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (!cookieStore.has('next-auth.session-token')) {
                console.log("*****************Caiu aqui********************")
                await signOut({
                    redirect: false
                })
        
                redirect('/')
            } else {
                console.log('caiu aqui 2')
                await signOut({
                    redirect: false
                })
        
                return Promise.reject(new AuthTokenError)
            }
        }

        return Promise.reject(error)
    })

    return api
}