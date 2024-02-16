import UserInfo from '@/app/components/userInfo/userInfo'
import styles from '../../../../components/userInfo/userInfo.module.css'
import { auth } from '@/app/lib/auth'

export default async function UserSettings() {
    const session = await auth();
        // Verificar se há uma sessão válida antes de renderizar o componente UserInfo
    if (session) {
        return (
            <main className={styles.container}>
                <UserInfo
                    uuid={session.user.uuid}
                    is_admin={session.user.is_admin}
                    document={session.user.document}
                    name={session.user.name}
                    email={session.user.email}
                    user_name={session.user.user_name}
                    function={session.user.function}
                    permissions={session.user.permissions || []} // Garantir que permissions seja um array
                    status={session.user.status}
                />
            </main>
        );
    } else {
        // Se não houver uma sessão válida, renderize o componente UserInfo com valores padrão vazios
        return (
            <main className={styles.container}>
                <UserInfo
                    uuid=''
                    is_admin={false}
                    document=''
                    name=''
                    email=''
                    user_name=''
                    function=''
                    permissions={[]} // Definir permissions como um array vazio
                    status=''
                />
            </main>
        );
    }
}
