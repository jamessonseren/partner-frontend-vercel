import styles from './company.module.css'
import { fetchCompanyData } from '@/app/lib/actions'
import CompanyDataForm from '../../../../components/companyDataForm/companyData'

export default async function Company() {

    let availableData = true

    const companyData = await fetchCompanyData()

    if(companyData.status !== 200){
        return(
            <>
                <h1>Erro</h1>
            </>
        )
    }


    return (
        <main className={styles.container}>

            <CompanyDataForm
                dataUuid={companyData.data.uuid}
                addressUuid={companyData.data.Address?.uuid}
                availableData={availableData}
                fantasy_name={companyData.data.fantasy_name}
                document={companyData.data.document}
                classification={companyData.data.classification}
                colaborators_number={companyData.data.colaborators_number}
                phone_1={companyData.data.phone_1}
                phone_2={companyData.data.phone_2}
                line1={companyData.data.Address?.line1}
                line2={companyData.data.Address?.line2}
                line3={companyData.data.Address?.line3}
                neighborhood={companyData.data.Address?.neighborhood}
                postal_code={companyData.data.Address?.postal_code}
                city={companyData.data.Address?.city}
                state={companyData.data.Address?.state}
                country={companyData.data.Address?.country}


            />

        </main>
    )
}