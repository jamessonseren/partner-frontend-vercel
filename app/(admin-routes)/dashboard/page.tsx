'use client'

import styles from '../../ui/dashboard/dashboard.module.css'
import Transactions from '../../components/transactions/transactions'
import Chart from '../../components/transactions/charts/charts'


export default function Dashboard() {


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                {/* <div className={styles.cards}>
                    
                    
                </div> */}
                <Transactions />
                <Chart />
            </div>
        </div>
    )
}