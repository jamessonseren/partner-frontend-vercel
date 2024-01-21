
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
            },
            {
                title: "Produtos",
                path: "/dashboard/products",
                icon: <MdShoppingBag />,
            },
            {
                title: "Transações",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdPeople />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Configurações",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const SideBar = async () => {

    const session = await auth()

    console.log("side bar session: ", session)
    console.log("")
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt='' width="50" height="50" />
                <div className={styles.userDetails}>
                    <span className={styles.userName}>{session?.user.user_name}</span>
                    <span className={styles.userTitle}>{session?.user.isAdmin ? "Admin" : ""}</span>
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