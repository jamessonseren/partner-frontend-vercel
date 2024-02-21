import { auth } from '@/app/lib/auth';
import styles from '../../../../components/contractText/contractText.module.css'

import { fetchCompanyData, fetchContracts } from '@/app/lib/actions';
import ContractComponent from '@/app/components/contractText/contractText';
import { ContractList } from '@/app/components/contractText/contractList/contractList';


export default async function ContractSettings() {

    const session = await auth()

    if (session) {

        const businessInfo = await fetchCompanyData(session.user.business_info_id)

        if (session.user.business_status === "pending_contract") {

            return (
                <main className={styles.container}>
                    <ContractComponent
                        admin_name={session!.user!.name}
                        fantasy_name={businessInfo.data.fantasy_name}
                        document={businessInfo.data.document}
                        line1={businessInfo.data.Address.line1}
                        line2={businessInfo.data.Address.line2}
                        line3={businessInfo.data.Address.line3}
                        neighborhood={businessInfo.data.Address.neighborhood}
                        city={businessInfo.data.Address.city}
                        state={businessInfo.data.Address.state}
                        country={businessInfo.data.Address.country}
                        postal_code={businessInfo.data.Address.postal_code}
                    />

                </main>
            )
        } else {

            const businessContracts = await fetchContracts(session.user.business_info_id)
            console.log('server component: ', businessContracts)
            // if(businessContracts.error === 'Invalid Token'){
            //     //redirect('/')
            // }

            if (businessContracts.status === 200) {

                return (
                    <main className={styles.container}>
                        <ContractList contracts={businessContracts.data} />
                    </main>
                )
            }
        }

        return (
            <>
              <h1>Algo deu errado. Tente fazer o logout</h1>
            </>
        )




    }
}
