'use server'
import axios, { AxiosError } from "axios";

import { AuthTokenError } from "./errors/AuthTokenError";
import { cookies } from 'next/headers'
import { auth } from "../lib/auth";
// import { auth } from "../lib/auth";

// import { signOut } from "../contexts/authContext";

export async function setupAPIClient(ctx = {}) {
   const cookieStore = cookies()
   

    const session = await auth()

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        //baseURL: 'https://vercel-correct-backend.vercel.app',
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    })
    api.interceptors.response.use(response => {

        return response
    }, async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (!cookieStore.has('next-auth.session-token')) {
                console.log("*****************Caiu aqui********************")
                
            } else {
                console.log('caiu aqui 2')
                
        
                return Promise.reject(new AuthTokenError)
            }
        }

        return Promise.reject(error)
    })

    return api
}