import styles from '../../ui/dashboard/dashboard.module.css'
import Transactions from '../../components/transactions/transactions'
import Chart from '../../components/transactions/charts/charts'
import Rightbar from '../../components/rightbar/rightbar'

export default async function Dashboard() {
    
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    
                    
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    )
}