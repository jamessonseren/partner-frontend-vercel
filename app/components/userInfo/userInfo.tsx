'use client'

import { FormEvent, useState } from 'react'
import styles from './userInfo.module.css'
import { z } from 'zod'

export type UserInfoProps = {
    uuid: string | undefined,
    is_admin: boolean | undefined,
    document: string | null | undefined,
    name: string | null | undefined,
    email: string | null | undefined
    user_name: string | null | undefined,
    function: string | null | undefined,
    permissions: string[] | null | undefined,
    status: string | null | undefined

}

export const userInfoSchema = z.object({
    document: z.string({
        required_error: "Este campo não pode estar vazio",
        invalid_type_error: "Este campo não pode estar vazio"
    }),
    new_pending_password: z.string(),
    repeat_pending_password: z.string()
}).refine((data) => data.repeat_pending_password === data.new_pending_password, {
    message: "As senhas não coincidem"
})



export default function UserInfo(props: UserInfoProps) {
    const [formData, setFormData] = useState(props);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const validationResult = userInfoSchema.safeParse(formData)



        if (!validationResult.success) {
            const errors: { [key: string]: string } = {};
            validationResult.error.errors.forEach((error) => {
                if (error.path) {
                    errors[error.path[0]] = error.message;
                }
            });
            setValidationErrors(errors);
            return;
        }

    }

    return (
        <div className={styles.formBox}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="hidden" name='data_uuid' value={props.uuid} />
                <div className={styles.grid2}>
                    <div className={styles.inputBox}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" placeholder={props.name ? props.name : ''} />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="name">Email</label>
                        <input disabled type="text" placeholder={props.email ? props.email : ''} />
                    </div>


                </div>
                <div className={styles.grid2}>
                    <div className={styles.inputBox}>
                        <label htmlFor="name">Nome de usuário (Opcional)</label>
                        <input type="text" placeholder={props.user_name ? props.user_name : ''} />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="name">CPF do Usuário {props.is_admin ? ' *' : ''} </label> {validationErrors.document && <span className={styles.errorMessage}>{validationErrors.document}</span>}
                        {props.is_admin ?
                            <>
                                <input type="text" placeholder={props.document ? props.document : ''} name='document' />

                            </>
                            :
                            <input disabled type="text" placeholder={props.document ? props.document : ''} />
                        }
                    </div>

                </div>
                <div className={styles.grid2}>
                    {props.status === 'pending_password' && (
                        <>
                            <div className={styles.inputBox}>
                                <label htmlFor="name">Nova Senha *</label> {validationErrors.new_pending_password && <span className={styles.errorMessage}>{validationErrors.new_pending_password}</span>}
                                <input type="password" name='new_pending_password' />
                            </div>
                            <div className={styles.inputBox}>
                                <label htmlFor="name">Repetir nova senha *</label>{validationErrors.new_pending_password && <span className={styles.errorMessage}>{validationErrors.new_pending_password}</span>}
                                <input type="password" name='repeat_pending_password' />
                            </div>
                        </>
                    )}
                    {props.status === 'active' && (
                        <>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Nova Senha</label>
                            <input type="password" name='new_password' />
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor="name">Repetir nova senha</label>
                            <input type="password" name='repeat_password' />
                        </div>
                    </>
                    )}

                </div>
                <button
                    type='submit'
                >
                    Atualizar Dados
                </button>
            </form>
        </div>
    )
}