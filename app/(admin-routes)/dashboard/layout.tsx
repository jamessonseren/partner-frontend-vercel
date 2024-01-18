import NavBar from "@/app/components/navBar/navBar"
import SideBar from "@/app/components/sidebar/sidebar"
import styles from '../../ui/dashboard/dashboard.module.css'
import Footer from "@/app/components/footer/footer"
import { ReactNode } from "react"
import BackButton from "@/app/components/backButton/backbutton"

interface LayoutProps {
    children: ReactNode
}
const Layout = async ({children}: LayoutProps) => {
  
   
    return(
        <div className={styles.container}>
            <div className={styles.menu}>
                <SideBar />
            </div>
            <div className={styles.content}>
                <NavBar />
                <BackButton />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout