import Card from "@/app/components/card/card";
import styles from './settings.module.css'

import Link from "next/link";

export default function Settings() {
    return (
        <main className={styles.container}>
            <h2>Configurações

            </h2>
            <Link href="/dashboard/settings/user">
                <Card
                    title="Usuário"
                    mainText="Informações de usuário"
                    secondText="Clique aqui para gerenciar informações de usuário"
                />
            </Link>
            <Link href="/dashboard/settings/company">
                <Card
                    title="Empresa"
                    mainText="Informações da empresa"
                    secondText="Clique aqui para atualizar os dados da empresa"
                />
            </Link>
            <Link href="/dashboard/settings/contract">
                <Card
                    title="Contrato"
                    mainText="Informações de Contrato"
                    secondText="Clique aqui para gerenciar informações de contrato"
                />
            </Link>
        </main>
    )
}