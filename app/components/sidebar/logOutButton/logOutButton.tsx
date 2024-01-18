'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MdLogout } from "react-icons/md"
import styles from './logOutButton.module.css'

export default function LogOutButton() {
    const router = useRouter()

    async function logOut() {
        await signOut({
            redirect: false
        })

        router.replace('/')
    }
    return (
        <button className={styles.logout} onClick={logOut}>
            <MdLogout />
            Logout
        </button>
    )
}