'use client'

import { createContract } from '@/app/lib/actions';
import styles from './modalContractConfirmation.module.css'
import { IoCloseCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


type ModalProps = {
    visible: boolean
    onClose: () => void
    contract_name: string
    contract_content: string
    contract_version: string
}

export const ModalContractConfirmation = (props: ModalProps) => {
    const [contractContentWithSignature, setContractContentWithSignature] = useState<string>('');
    const [passwordAttempts, setPasswordAttempts] = useState<number>(() => {
        const storedAttempts = localStorage.getItem('passwordAttempts');
        return storedAttempts ? parseInt(storedAttempts) : 0;
    });

    const router = useRouter()

    const { data: session, update } = useSession()

    const signContract = async (formData: FormData) => {

        const response = await createContract(formData)

        if (response.status === 200) {
            toast.success("Contrato assinado com sucesso")

            await update({
                ...session,
                user: {
                    ...session?.user,
                    business_status: response.data.uuid
                }
            })
            localStorage.removeItem('passwordAttempts');

            router.refresh()

        } else if (response.error === "Incorrect credentials") {
            setPasswordAttempts(prevAttempts => prevAttempts + 1)
            const remainingAttempts = 4 - (passwordAttempts + 1);

            if (remainingAttempts <= 0) {
                await logOut()
            } else {
                localStorage.setItem('passwordAttempts', String(passwordAttempts + 1));
                toast.error(`Senha incorreta. Você tem ${remainingAttempts} ${remainingAttempts === 1 ? 'tentativa restante' : 'tentativas restantes.'}`);
            }

            return

        } else if (response.status !== 200) {
            toast.error("Erro ao assinar o contrato")
            return
        }

    }

    async function logOut() {
        await signOut({
            redirect: false
        })
        localStorage.removeItem('passwordAttempts');

        router.replace('/')
    }

    useEffect(() => {
        const signedContent = `${props.contract_content}<h2>Assinado digitalmente por: ${session?.user.name}</h2>`;
        setContractContentWithSignature(signedContent);

    })


    return (
        <div className={`${styles.modal} ${props.visible ? styles.isVisible : ''}`}>
            <div className={styles.closeButton} onClick={props.onClose}>
                <IoCloseCircle />
            </div>
            <form action={signContract} className={`${styles.form} `}>
                <input type="hidden" name='name' value={props.contract_name} />
                <input type="hidden" name='content' value={contractContentWithSignature} />
                <input type="hidden" name='version' value={props.contract_version} />
                <input type="hidden" name='business_info_uuid' value={session?.user.business_info_id} />

                <label htmlFor="password">Digite a sua senha para confirmar</label>
                <input type="password" name='password' />
                <button>Confirmar</button>
            </form>
        </div>
    )
}