import UserInfo from '@/app/components/userInfo/userInfo'
import styles from '../../../../components/userInfo/userInfo.module.css'
import { auth } from '@/app/lib/auth'

export default async function UserSettings(){
    const session = await auth()
    return(
        <main className={styles.container}>
            <UserInfo 
                uuid={session?.user.uuid}
                is_admin={session?.user.is_admin}
                document={session?.user.document}
                name={session?.user.name}
                email={session?.user.email}
                user_name={session?.user.user_name}
                function={session?.user.function}
                permissions={session?.user.permissions}
                status={session?.user.status}

            />
        </main>
    )
}