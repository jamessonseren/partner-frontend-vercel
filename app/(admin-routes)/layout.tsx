import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface PrivateLayoutProps {
    children: ReactNode
}


export default async function PrivateLayout({ children }: PrivateLayoutProps) {

    return <>
        {children}
    </>
}