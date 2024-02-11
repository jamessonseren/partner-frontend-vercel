import styles from './company.module.css'
import { fetchCompanyAddress, fetchCompanyData } from '@/app/lib/actions'
import CompanyDataForm from '../../../../components/companyDataForm/companyData'
import { auth } from '@/app/lib/auth'

export default async function Company() {

    let availableData = true

    const session = await auth()

    const companyData = await fetchCompanyData(session?.user.business_info_id)

   



    return (
        <main className={styles.container}>

            <CompanyDataForm
                dataUuid={companyData?.uuid}
                addressUuid={companyData?.Address.uuid}
                availableData={availableData}
                fantasy_name={companyData?.fantasy_name}
                document={companyData?.document}
                classification={companyData?.classification}
                colaborators_number={companyData?.colaborators_number}
                phone_1={companyData?.phone_1}
                phone_2={companyData?.phone_2}
                line1={companyData.Address?.line1}
                line2={companyData.Address?.line2}
                line3={companyData.Address?.line3}
                neighborhood={companyData.Address?.neighborhood}
                postal_code={companyData.Address?.postal_code}
                city={companyData.Address?.city}
                state={companyData.Address?.state}
                country={companyData.Address?.country}


            />

        </main>
    )
}