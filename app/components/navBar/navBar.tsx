"use client"

import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";
import { useState } from 'react';
import Rightbar from '../rightbar/rightbar';
import { IoMdClose } from "react-icons/io";


const NavBar = () => {
    const [rightBarVisible, setRightBarVisible] = useState(false);

    const pathname = usePathname()

    const openNotification = () => {

        setRightBarVisible(true);
    }

    const closeNotification = () => {
        setRightBarVisible(false)
    }

    return (
        <div className={styles.container}>

            <div className={styles.title}>{pathname.split("/").pop()}</div>

            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch />
                    <input type="text" placeholder='Pesquisar' className={styles.input} />
                </div>
                <div className={styles.icons}>
                    {/* <MdOutlineChat size={20} /> */}
                    <MdNotifications size={20} onClick={openNotification} className={styles.notification} />
                    {/* <MdPublic size={20} /> */}
                </div>
            </div>
            <div className={`${styles.side} ${rightBarVisible ? styles.showNotification : ''} `}>
                <IoMdClose className={styles.closeButton} onClick={closeNotification}/>
                <Rightbar />
            </div>
        </div>
    )
}

export default NavBar