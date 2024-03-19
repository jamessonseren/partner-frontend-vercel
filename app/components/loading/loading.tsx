import styles from "./loading.module.css"

const Loading = () => {
    return (
        <main className={styles.container}>
            <section className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <span>Carregando</span>
            </section>
         
        </main>
    )
}

export default Loading