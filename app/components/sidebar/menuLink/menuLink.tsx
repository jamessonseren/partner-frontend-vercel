"use client"

import { usePathname } from 'next/navigation'
import styles from './menuLink.module.css'
import Link from 'next/link'

type MenuLinkProps = {
    title: string,
    list: ListProps[]
}

type ListProps = {
    title: string,
    path: string,
    icon: JSX.Element
}
const MenuLink = (item: MenuLinkProps) => {

    const pathname = usePathname()
    return (
        <div>
            {item.list.map((listItem, index) => (
                <Link key={index} href={listItem.path} className={`${styles.container} ${pathname === listItem.path && styles.active}`}>
                    {listItem.icon}
                    {listItem.title}
                </Link>
            ))}
        </div>
    )
}

export default MenuLink