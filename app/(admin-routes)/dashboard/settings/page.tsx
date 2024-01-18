import Card from "@/app/components/card/card";
import styles from './settings.module.css'

import Link from "next/link";

export default function Settings() {
    return (
        <main className={styles.settingsMain}>
            <h2>Configurações

            </h2>
            <Link href="/dashboard/settings/company">
                <Card
                    title="Empresa"
                    mainText="Informações da empresa"
                    secondText="Clique aqui para atualizar os dados da empresa"
                />
            </Link>
            <Card
                title="Empresa"
                mainText="Informações da empresa"
                secondText=""
            />
            <Card
                title="Empresa"
                mainText="Informações da empresa"
                secondText=""
            />
        </main>
    )
}