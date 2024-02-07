
import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css'
import Image from 'next/image';


import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import LogOutButton from './logOutButton/logOutButton';
import { auth } from '@/app/lib/auth';
import { useContext } from 'react';

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Usuários",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            }
        ],
    },
    {
        title: "Finanças",
        list: [
            {
                title: "Relatórios",
                path: "/dashboard/finances/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Transações",
                path: "/dashboard/finances/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    
    {
        title: "Ecommerce",
        list: [
            {
                title: "Relatórios",
                path: "/dashboard/ecommerce",
                icon: <MdAnalytics />,
            },
            {
                title: "Definições",
                path: "/dashboard/ecommerce/settings",
                icon: <MdWork />,
            },
            {
                title: "Produtos",
                path: "/dashboard/ecommerce/products",
                icon: <MdShoppingBag />,
            },
            
        ],
    },
    
    {
        title: "Empresa",
        list: [
            {
                title: "Configurações",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Suporte",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const SideBar = async () => {

    const session = await auth()


    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt='' width="50" height="50" />
                <div className={styles.userDetails}>
                    <span className={styles.userName}>{session?.user.user_name}</span>
                    <span className={styles.userTitle}>{session?.user.is_admin ? "Admin" : ""}</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink title={item.title} list={[item]} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <LogOutButton />

        </div>
    )
}

export default SideBar