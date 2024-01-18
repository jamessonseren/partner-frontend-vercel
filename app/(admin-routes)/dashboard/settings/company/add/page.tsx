'use client'

import styles from './companyData.module.css'

import { IMaskInput } from 'react-imask'
import { dataSchemaZod } from '@/app/components/companyDataForm/validationDataSchema'
import { useRouter } from 'next/navigation'

import { classificationOptions } from '@/app/utils/company-options.utils'
import { stateOptions } from '@/app/utils/company-options.utils'

import Link from 'next/link'
import { useState } from 'react'
import React from 'react'

import { addCompanyData } from '@/app/lib/actions'


type FormErrors = {
    [key: string]: string[] | undefined;
} | null;


export type CompanyDataProps = {
    availableData: boolean
    corporate_name: string;
    cnpj: string;
    classification: string;
    total_employees: number;
    phone_1: string;
    phone_2: string | null;
}
export default function CompanyDataForm(props: CompanyDataProps) {
    const [editMode, setEditMode] = useState(props.availableData)

    const router = useRouter()

    const [errorsMessage, setErrorsMessage] = useState<FormErrors>(null);


    async function registerData(formData: FormData) {

        const response = await addCompanyData(formData)

        type FormErrors = {
            [key: string]: string[] | undefined;
        } | null;


        if (response?.error) {
            const formattedErrors: FormErrors = {};

            response.error.forEach((issue) => {
                const fieldName = issue.path[0];
                const errorMessage = issue.message;

                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }

                formattedErrors[fieldName]?.push(errorMessage);
            });

            setErrorsMessage(formattedErrors);

        }



    }

    function handleEditMode() {
        if (editMode) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

    return (
        <div className={styles.formBox}>
            <form action={registerData} className={styles.form}>
                <article className={styles.containerData}>
                    <div className={styles.top}>
                        <h3>Informações Gerais</h3>
                        <a onClick={handleEditMode}>Editar</a>
                    </div>
                    <section className={styles.containerInfoOverall}>
                        <div className={`${styles.inputGroup} ${styles.box1}`}>
                            <label htmlFor='documento'>CNPJ *</label>
                            <IMaskInput
                                type='text'
                                name='document'
                                id='document'
                                readOnly={editMode}
                                defaultValue={props.cnpj}
                                mask={[
                                    { mask: '000.000.000-00', maxLength: 11 },
                                    { mask: '00.000.000/0000-00' }
                                ]}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.document && (
                                <p className={styles.errorMessage}>{errorsMessage.document.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box2}`}>
                            <label htmlFor='corporate_name'>Nome Fantasia *</label>
                            <input
                                type='text'
                                name='corporate_name'
                                defaultValue={props.corporate_name}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}

                            />
                            {errorsMessage?.corporate_name && (
                                <p className={styles.errorMessage}>{errorsMessage.corporate_name.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box3}`}>
                            <label htmlFor='classification'>Classificação da Empresa * </label>
                            <select
                                name="classification"
                                defaultValue={props.classification}
                                disabled={editMode}

                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            >
                                {classificationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box4}`}>
                            <label htmlFor='total_employees'>Total de colaboradores</label>
                            <input
                                type='number'
                                name='total_employees'
                                defaultValue={props.total_employees}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}

                            />
                            {errorsMessage?.total_employees && (
                                <p className={styles.errorMessage}>{errorsMessage.total_employees.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box5}`}>
                            <label htmlFor='phone_1'>Telefone 1 *</label>
                            <IMaskInput
                                placeholder='(00) 9 0000-0000'
                                name='phone_1'
                                type='tel'
                                id='phone_1'
                                autoComplete='phone_1'
                                mask={'(00) 90000-0000'}
                                className={`${styles.input}`}
                                defaultValue={props.phone_1}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.phone_1 && (
                                <p className={styles.errorMessage}>{errorsMessage.phone_1.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box6}`}>
                            <label htmlFor='phone_2'>Telefone 2</label>
                            <IMaskInput
                                placeholder='(00) 9 0000-0000'
                                type='tel'
                                name='phone_2'
                                id='phone_2'
                                autoComplete='phone_2'
                                mask={'(00) 90000-0000'}
                                className={`${styles.input}`}
                                defaultValue={props.phone_2 ? props.phone_2 : ''}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />

                        </div>

                    </section>
                    <div>
                        <h3>Endereço</h3>
                    </div>
                    <section className={styles.containerAddress}>
                        <div className={`${styles.inputGroup} ${styles.box1}`}>
                            <label htmlFor='zip_code'>CEP *</label>
                            <IMaskInput
                                type='text'
                                name='zip_code'
                                id='zip_code'
                                autoComplete='zip_code'
                                mask={'00000-000'}
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.zip_code && (
                                <p className={styles.errorMessage}>{errorsMessage.zip_code.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box2}`}>
                            <label htmlFor='street'>Rua  *</label>
                            <input
                                type='text'
                                name='street'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.street && (
                                <p className={styles.errorMessage}>{errorsMessage.street.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box3}`}>
                            <label htmlFor='number'>Número  *</label>
                            <input
                                type='text'
                                name='number'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.number && (
                                <p className={styles.errorMessage}>{errorsMessage.number.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box4}`}>
                            <label htmlFor='complement'>Complemento</label>
                            <input
                                type='text'
                                name='complement'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box5}`}>
                            <label htmlFor='neighborhood'>Bairro *</label>
                            <input
                                type='text'
                                name='neighborhood'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.neighborhood && (
                                <p className={styles.errorMessage}>{errorsMessage.neighborhood.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box6}`}>
                            <label htmlFor='city'>Cidade *</label>
                            <input
                                type='text'
                                name='city'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />
                            {errorsMessage?.city && (
                                <p className={styles.errorMessage}>{errorsMessage.city.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box7}`}>
                            <label htmlFor="state">UF *</label>
                            <select name="state"
                                disabled={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            >
                                {stateOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errorsMessage?.state && (
                                <p className={styles.errorMessage}>{errorsMessage.state.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box8}`}>
                            <label htmlFor='city'>País *</label>
                            <input
                                type='text'
                                name='country'
                                readOnly={editMode}
                                style={{
                                    backgroundColor: !editMode ? '' : 'rgba(101, 98, 143, 0.219)',

                                }}
                            />

                            {errorsMessage?.country && (
                                <p className={styles.errorMessage}>{errorsMessage.country.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                    </section>
                </article>
                <div className={styles.buttons}>
                    <Link href="/dashboard/settings"
                    >Voltar</Link>
                    <button
                        type='submit'
                    >
                        Salvar Dados
                    </button>

                </div>
            </form>
        </div>
    )
}