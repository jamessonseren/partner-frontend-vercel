'use client'

import styles from './modalContractConfirmation.module.css'
import { IoCloseCircle } from "react-icons/io5";

type ModalProps = {
    visible: boolean
    onClose: () => void
}

export const ModalContractConfirmation = (props: ModalProps) => {
    
    return (
        <div className={`${styles.modal} ${props.visible ? styles.isVisible : ''}`}>
            <div className={styles.closeButton} onClick={props.onClose}>
                <IoCloseCircle />
            </div>
            <form action="" className={`${styles.form} `}>
                <label htmlFor="password">Digite a sua senha para confirmar</label>
                <input type="password" />
                <button>Confirmar</button>
            </form>
        </div>
    )
}