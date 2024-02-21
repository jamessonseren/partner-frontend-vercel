'use client'

import { ReactNode, useEffect } from "react";

interface PrivateLayoutProps {
    children: ReactNode
}


export default function PrivateLayout({ children }: PrivateLayoutProps) {

    return <>
        {children}
    </>
}