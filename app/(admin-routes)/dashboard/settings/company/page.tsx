import styles from './company.module.css'
import { fetchCompanyAddress, fetchCompanyData } from '@/app/lib/actions'
import CompanyDataForm from './add/page'
import { auth } from '@/app/lib/auth'

export default async function Company() {

    let availableData = true

    const session = await auth()

    const companyData = await fetchCompanyData(session?.user.business_info_id)

    const companyAddress = await fetchCompanyAddress(companyData?.address_uuid)
    if (companyData === "Company Data not registered") {
        availableData = false
    }



    return (
        <main className={styles.container}>

            <CompanyDataForm
                dataUuid={companyData?.uuid}
                addressUuid={companyAddress?.uuid}
                availableData={availableData}
                fantasy_name={companyData?.fantasy_name}
                document={companyData?.document}
                classification={companyData?.classification}
                colaborators_number={companyData?.colaborators_number}
                phone_1={companyData?.phone_1}
                phone_2={companyData?.phone_2}
                line1={companyAddress?.line1}
                line2={companyAddress?.line2}
                line3={companyAddress?.line3}
                neighborhood={companyAddress?.neighborhood}
                postal_code={companyAddress?.postal_code}
                city={companyAddress?.city}
                state={companyAddress?.state}
                country={companyAddress?.country}


            />

        </main>
    )
}