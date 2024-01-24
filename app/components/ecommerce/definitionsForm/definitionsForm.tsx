import styles from './definitionsForm.module.css'

async function setDefinitions() {
    'use server'
    return
}
export const DefinitionsForm = () => {
    return (
        <div className={styles.container}>
            <form action={setDefinitions} className={styles.form}>
                <div>
                    <label>Digite um diferencial que a sua empresa vai ofecer</label>
                    <input type="text" placeholder="Entrega gratuita..." name="title" required />

                </div>
                <div>
                    <label htmlFor="">Entrega?</label>
                    <select name="cat" id="cat">
                        <option value="general">Sim</option>
                        <option value="kitchen">Não</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Extra</label>

                    <input type="number" placeholder="Informações extras" name="stock" required />
                </div>

                <button type="submit">Ajustar definições</button>
            </form>
        </div>
    )
}

export default DefinitionsForm