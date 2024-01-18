

import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { getSession, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

// import { signOut } from "../contexts/authContext";

export async function setupAPIClient(ctx = {}) {

    const session = await getServerSession(nextAuthOptions)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        //baseURL: 'https://vercel-correct-backend.vercel.app',
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    })
    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                console.log("*****************Caiu aqui********************")
                signOut()
            } else {
                return Promise.reject(new AuthTokenError)
            }
        }

        return Promise.reject(error)
    })

    return api
}