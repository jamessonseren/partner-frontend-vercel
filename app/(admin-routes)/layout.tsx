import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
    children: ReactNode
}
export default async function PrivateLayout( {children}: PrivateLayoutProps){

    // if(!session){
    //     redirect('/')
    // }

    return <>{children}</>
}