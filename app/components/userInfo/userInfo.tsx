'use client'

import { useEffect, useState } from 'react'
import styles from './userInfo.module.css'
import { ZodIssue, z } from 'zod'
import { IMaskInput } from 'react-imask'
import { updateCompanyUserDetails, updateSession } from '@/app/lib/actions'
import { toast } from 'react-toastify'
import { signOut, useSession } from 'next-auth/react'
import { auth, update } from '@/app/lib/auth'
import { useRouter } from 'next/navigation'

export type UserInfoProps = {
    uuid: string,
    is_admin: boolean,
    document: string | null,
    user_name: string | null,
    email: string | null
    name: string | null,
    permissions: string[],
    function: string | null,
    status: string | null

}



type FormErrors = {
    [key: string]: string[] | undefined;
} | null;


export default function UserInfo(props: UserInfoProps) {

    const [errorsMessage, setErrorsMessage] = useState<FormErrors>(null);
    const [passwordFieldIsVisible, setPasswordIsVisible] = useState(false)



    const handleSubmitFirstSignIn = async (formData: FormData) => {

        const response = await updateCompanyUserDetails(formData)

        if (response.status === 200) {
            toast.success("Dados atualizados com sucesso")
            await signOut()
            return

        }
        if (response.error === 'Admin must update password') {
            toast.warn("Por favor, altere a senha")
            return
        }

        if (response.error === 'Document is required') {
            toast.warn("Por favor, atualize o seu CPF")
            return
        }

        if (response.status !== '200') {
            toast.error("Algo de errado. Tente novamente!")
        }

        if (response?.error) {
            const formattedErrors: FormErrors = {};

            response.error.forEach((issue: ZodIssue) => {
                const fieldName = issue.path[0];
                const errorMessage = issue.message;

                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }

                formattedErrors[fieldName]?.push(errorMessage);
            });

            setErrorsMessage(formattedErrors);

            return

        }

    }

    const handleSubmitRegularUpdates = async (formData: FormData) => {

        const response = await updateCompanyUserDetails(formData)

        if (response.status === 200) {
            toast.success("Dados atualizados com sucesso")
            await signOut()
            return

        }

        if (response.error === 'User name already registered') {
            toast.warn("Nome de usuário indisponível")
            return
        }

        if (response.status !== 200) {
            toast.error("Algo deu Errado. Tente novamente")
            return
        }
        if (response?.error) {
            const formattedErrors: FormErrors = {};

            response.error.forEach((issue: ZodIssue) => {
                const fieldName = issue.path[0];
                const errorMessage = issue.message;

                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }

                formattedErrors[fieldName]?.push(errorMessage);
            });

            setErrorsMessage(formattedErrors);

            return

        }

    }

    useEffect(() => {

        if (props.status === "pending_password") {
            setPasswordIsVisible(true)
        }
    }, [])

    function editPassword() {
        if (!passwordFieldIsVisible) {
            setPasswordIsVisible(true)
        } else {
            setPasswordIsVisible(false)

        }
    }



    return (
        <div className={styles.formBox}>

            {props.status === "pending_password" && (
                <form className={styles.form} action={handleSubmitFirstSignIn}>

                    <input className={styles.inputForm} type="hidden" name='data_uuid' value={props.uuid} />
                    <div className={styles.grid2}>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                placeholder={props.name ? props.name : ''}
                                name='name'
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Email</label>
                            <input disabled type="text" placeholder={props.email ? props.email : ''} />
                        </div>


                    </div>
                    <div className={styles.grid2}>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nome de usuário (Opcional)</label>
                            <input
                                type="text"
                                placeholder={props.user_name ? props.user_name : ''}
                                name='user_name'
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">CPF do Usuário {props.is_admin && !props.document ? ' *' : ''} </label>  {errorsMessage?.document && (
                                <p className={styles.errorMessage}>{errorsMessage.document.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                            {props.is_admin ?
                                <>
                                    <IMaskInput
                                        type='text'
                                        name='document'
                                        id='document'
                                        placeholder={props.document ? props.document : ""}
                                        mask={[
                                            { mask: '000.000.000-00', maxLength: 11 }
                                        ]}
                                    />

                                </>
                                :
                                <input disabled type="text" placeholder={props.document ? props.document : ''} />
                            }
                        </div>

                    </div>
                    <div className={styles.grid2}>

                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nova Senha *</label> {errorsMessage?.new_password && (
                                <p className={styles.errorMessage}>{errorsMessage.new_password.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                            <input
                                type="password"
                                name='new_password'

                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Repetir nova senha *</label>
                            {errorsMessage?.confirm_password && (
                                <p className={styles.errorMessage}>{errorsMessage.confirm_password.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                            <input
                                type="password"
                                name='confirm_password'

                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                    >
                        Atualizar Dados
                    </button>


                </form>
            )}

            {props.status !== "pending_password" && (
                <form className={styles.form} action={handleSubmitRegularUpdates}>
                    {/* <input type="hidden" name='all_empty' /> */}
                    <input type="hidden" name='data_uuid' value={props.uuid} />
                    <div className={styles.grid2}>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                placeholder={props.name ? props.name : ''}
                                name='name'
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Email</label>
                            <input disabled type="text" placeholder={props.email ? props.email : ''} />
                        </div>


                    </div>
                    <div className={styles.grid2}>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nome de usuário (Opcional)</label>
                            <input
                                type="text"
                                placeholder={props.user_name ? props.user_name : ''}
                                name='user_name'
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">CPF do Usuário {props.is_admin && !props.document ? ' *' : ''} </label>  {errorsMessage?.document && (
                                <p className={styles.errorMessage}>{errorsMessage.document.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                            {props.is_admin ?
                                <>
                                    <IMaskInput
                                        type='text'
                                        name='document'
                                        id='document'
                                        placeholder={props.document ? props.document : ""}
                                        mask={[
                                            { mask: '000.000.000-00', maxLength: 11 }
                                        ]}
                                    />

                                </>
                                :
                                <input disabled type="text" placeholder={props.document ? props.document : ''} />
                            }
                        </div>

                    </div>
                    {!passwordFieldIsVisible && (
                        <>
                            <div onClick={editPassword} className={styles.passwordButton}>
                                <p>Editar Senha</p>
                            </div>
                        </>
                    )}
                    {passwordFieldIsVisible && (
                        <>
                            <div onClick={editPassword} className={styles.passwordButton}>
                                <p>Esconder</p>
                            </div>
                            <div className={styles.grid2}>

                                <>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="name">Nova Senha</label> {errorsMessage?.new_password && (
                                            <p className={styles.errorMessage}>{errorsMessage.new_password.map((error, index) => (
                                                <span key={index}>{error}</span>
                                            ))}</p>)}
                                        <input
                                            type="password"
                                            name='new_password'

                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="name">Repetir nova senha</label>{errorsMessage?.confirm_password && (
                                            <p className={styles.errorMessage}>{errorsMessage.confirm_password.map((error, index) => (
                                                <span key={index}>{error}</span>
                                            ))}</p>)}
                                        <input
                                            type="password"
                                            name='confirm_password'

                                        />
                                    </div>
                                </>
                            </div>
                        </>
                    )}
                    <button
                        type='submit'
                    >
                        Atualizar Dados
                    </button>
                    {
                        errorsMessage?.all_empty && (
                            <p className={styles.errorMessage}>{errorsMessage.all_empty}</p>
                        )
                    }

                </form>
            )}
        </div>
    )
}