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



export default function CompanyDataForm() {
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

    return (
        <div className={styles.formBox}>
            <form action={registerData} className={styles.form}>
                <article className={styles.containerData}>
                    <div>
                        <h3>Informações Gerais</h3>
                    </div>
                    <section className={styles.containerInfoOverall}>
                        <div className={`${styles.inputGroup} ${styles.box1}`}>
                            <label htmlFor='documento'>CNPJ *</label>
                            <IMaskInput
                                type='text'
                                name='document'
                                id='document'
                                mask={[
                                    { mask: '000.000.000-00', maxLength: 11 },
                                    { mask: '00.000.000/0000-00' }
                                ]}
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

                            />
                            {errorsMessage?.corporate_name && (
                                <p className={styles.errorMessage}>{errorsMessage.corporate_name.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                        <div className={`${styles.inputGroup} ${styles.box3}`}>
                            <label htmlFor='classification'>Classificação da Empresa * </label>
                            <select name="classification">
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
                                type='text'
                                name='total_employees'
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
                            />

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box5}`}>
                            <label htmlFor='neighborhood'>Bairro *</label>
                            <input
                                type='text'
                                name='neighborhood'
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
                            />
                            {errorsMessage?.city && (
                                <p className={styles.errorMessage}>{errorsMessage.city.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}

                        </div>
                        <div className={`${styles.inputGroup} ${styles.box7}`}>
                            <label htmlFor="state">UF *</label>
                            <select name="state">
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
                            />

                            {errorsMessage?.country && (
                                <p className={styles.errorMessage}>{errorsMessage.country.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))}</p>)}
                        </div>
                    </section>
                </article>
                <div className={styles.buttons}>
                    <Link href="/dashboard"
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