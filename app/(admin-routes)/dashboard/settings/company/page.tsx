import styles from './company.module.css'
import { addCompanyData, fetchCompanyData } from '@/app/lib/actions'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { setupAPIClient } from '@/app/services/api'
import CompanyDataForm from './add/page'
import Link from 'next/link'

export default async function Company() {

    let availableData = true

    const companyData = await fetchCompanyData()
    if (companyData === "Company Data not registered") {
        availableData = false
    }



    return (
        <main className={styles.container}>

            <CompanyDataForm
                availableData={availableData}
                corporate_name={companyData.corporate_name}
                cnpj={companyData.cnpj}
                classification={companyData.classification}
                total_employees={companyData.total_employees}
                phone_1={companyData.phone_1}
                phone_2={companyData.phone_2}

            />

        </main>
    )
}