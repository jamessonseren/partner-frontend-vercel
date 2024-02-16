'use client'

import { createContract } from '@/app/lib/actions';
import styles from './modalContractConfirmation.module.css'
import { IoCloseCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

type ModalProps = {
    visible: boolean
    onClose: () => void
    contract_name: string
    contract_content: string
    contract_version: string
}

export const ModalContractConfirmation = (props: ModalProps) => {

    const { data: session, update} = useSession()

    const signContract = async (formData: FormData) => {

        const response = await createContract(formData)

        if(response.status === 200){
            toast.success("Contrato assinado com sucesso")

            await update({
                ...session,
                user: {
                    ...session?.user,
                    contract_info_uuid: response.data.uuid
                }
            })

        }else {
            toast.error("Erro ao assinar o contrato")
            return
        }


    }
    return (
        <div className={`${styles.modal} ${props.visible ? styles.isVisible : ''}`}>
            <div className={styles.closeButton} onClick={props.onClose}>
                <IoCloseCircle />
            </div>
            <form action={signContract} className={`${styles.form} `}>
                <input type="hidden" name='name' value={props.contract_name} />
                <input type="hidden" name='content' value={props.contract_content} />
                <input type="hidden" name='version' value={props.contract_version}/>

                <label htmlFor="password">Digite a sua senha para confirmar</label>
                <input type="password" name='password'/>
                <button>Confirmar</button>
            </form>
        </div>
    )
}