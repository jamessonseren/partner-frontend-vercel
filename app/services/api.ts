'use server'

import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";
import { cookies } from 'next/headers'
import { auth } from "../lib/auth";
import { signOut } from "next-auth/react";
import {logOut} from "../contexts/authContext";
import { redirect } from "next/navigation";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { NextResponse } from "next/server";

const baseURL = 'https://api-correct-vercel.vercel.app/'
//const baseURL = 'http://localhost:3333'


export async function setupAPIClient(ctx = {}) {
    const cookieStore = cookies()

    const session = await auth()
    if(session?.expires){}
    const api = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    })
    api.interceptors.response.use(response => {

        return response
    }, async (error: AxiosError) => {
        console.log("error axios: ", error)
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                console.log("**************caiu aqui 1*************")
                // try{
                //     // await signOut({
                //     //     redirect: false
                //     // })
                //     destroyCookie(undefined, '@nextauth.token')
                //     //redirect('/dashboard')

                // }catch(err: any){
                //     console.log('logout error', err)
                // }
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