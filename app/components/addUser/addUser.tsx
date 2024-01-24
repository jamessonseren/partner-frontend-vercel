// import { addU
'use client'

import { addUser } from '@/app/lib/actions';
import styles from './singleUser.module.css'
import Switch from 'react-switch'
import { useState } from 'react';
import { useFormStatus } from 'react-dom';


const AddUserForm = () => {

    const [permissions, setPermissions] = useState<string[]>([]);
    const { pending } = useFormStatus()
    const handleRoleToggle = (permission: string) => {
        if (permissions.includes(permission)) {
            setPermissions(permissions.filter((r) => r !== permission));
            console.log(permission)
        } else {
            setPermissions([...permissions, permission]);
        }
    };

    return (
        <div className={styles.container}>

            <form action={addUser} className={styles.form}>
                <input type="hidden" name="permissions" value={JSON.stringify(permissions)} />
                <input type="text" placeholder="Nome do usuário" name="user_name" required />
                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    required
                />
                <div className={styles.toggles}>
                    <div className={styles.switchBox}>
                        <label>
                            Vendas
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("sales")}
                            checked={permissions.includes("sales")}
                        />
                    </div>
                    <div className={styles.switchBox}>
                        <label>
                            Finanças
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("finances")}
                            checked={permissions.includes("finances")}
                        />
                    </div>
                    <div className={styles.switchBox}>
                        <label>
                            Marketing
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("marketing")}
                            checked={permissions.includes("marketing")}
                        />
                    </div>

                </div>
                
                <button type="submit" disabled={pending}> {pending ? "Carregando" : "Criar Usuário"} </button>
            </form>
            <div className={styles.permissionsDetails}>
                <h1>Permissões</h1>
                <div className={styles.permissionType}>
                    <h3>Vendas</h3>
                    <p>Acessa somente a tela de processamento de compras.</p>
                </div>
                <div className={styles.permissionType}>
                    <h3>Finanças</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, magnam.</p>
                </div>
                <div className={styles.permissionType}>
                    <h3>Marketing</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, magnam.</p>
                </div>
            </div>
        </div>
    );
};
export default AddUserForm;