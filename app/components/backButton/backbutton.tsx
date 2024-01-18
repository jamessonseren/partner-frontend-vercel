'use client'

import { usePathname } from 'next/navigation'
import styles from './backButton.module.css'

import Link from 'next/link';

import { IoMdArrowBack } from "react-icons/io";

const getPreviousPath = (currentPath: string) => {
    const pathSegments = currentPath.split('/');
    
    // Remova o último segmento do caminho atual
    const previousPathSegments = pathSegments.slice(0, -1);


    // Junte os segmentos para obter o caminho anterior
    const previousPath = previousPathSegments.join('/') || '/';

    // console.log({previousPath})
    return previousPath;
};

const BackButton = () => {

   
    const pathname = usePathname()

    const previousPath = getPreviousPath(pathname)
    return (
        <div className={styles.container}>
            <Link href={previousPath}>
                <IoMdArrowBack />
                <label htmlFor="back">Voltar</label>
            </Link>
        </div>
    )
}

export default BackButton