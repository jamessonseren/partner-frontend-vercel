'use server'
import axios, { AxiosError } from "axios";

import { AuthTokenError } from "./errors/AuthTokenError";
import { cookies } from 'next/headers'
import { auth } from "../lib/auth";

//const baseURL = 'https://api-correct-vercel.vercel.app/'
const baseURL = 'http://localhost:3333'

export async function setupAPIClient(ctx = {}) {
    const cookieStore = cookies()

    const session = await auth()

    const api = axios.create({
        baseURL: baseURL,
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