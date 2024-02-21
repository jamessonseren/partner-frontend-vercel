import { auth } from '@/app/lib/auth';
import styles from '../../../../components/contractText/contractText.module.css'

import { fetchCompanyData, fetchContracts } from '@/app/lib/actions';
import ContractComponent from '@/app/components/contractText/contractText';
import { ContractList } from '@/app/components/contractText/contractList/contractList';
import { logOut } from '@/app/contexts/authContext';



export default async function ContractSettings() {

    const session = await auth()

    if (session) {

        const businessInfo = await fetchCompanyData(session?.user.business_info_id)

        if (session.user.business_status === "pending_contract") {

            return (
                <main className={styles.container}>
                    <ContractComponent
                        admin_name={session!.user!.name}
                        fantasy_name={businessInfo.fantasy_name}
                        document={businessInfo.document}
                        line1={businessInfo.Address.line1}
                        line2={businessInfo.Address.line2}
                        line3={businessInfo.Address.line3}
                        neighborhood={businessInfo.Address.neighborhood}
                        city={businessInfo.Address.city}
                        state={businessInfo.Address.state}
                        country={businessInfo.Address.country}
                        postal_code={businessInfo.Address.postal_code}
                    />

                </main>
            )
        } else {

            const businessContracts = await fetchContracts(session.user.business_info_id)

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
            <h2>Oops.. Algo deu erro. Atualize a página.</h2>
        </>)

        

        
    }
}
