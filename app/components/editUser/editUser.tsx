// import { addU
'use client'

import { editUser } from '@/app/lib/actions';
import styles from './editUser.module.css'
import Switch from 'react-switch'
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { CompanyUser } from '@/app/(admin-routes)/dashboard/users/page';

const EditUserForm = (data: { user: CompanyUser }, business_document: string) => {
    const [permissions, setPermissions] = useState<string[]>(data.user?.permissions);
    const { pending } = useFormStatus()
    const handleRoleToggle = (permission: string) => {
        if (permissions.includes(permission)) {
            setPermissions(permissions.filter((r) => r !== permission));
        } else {
            setPermissions([...permissions, permission]);
        }
    };

    return (
        <div className={styles.container}>

            <form action={editUser} className={styles.form}>
                <input type="hidden" name="user_id" value={data.user?.uuid} />
                <input type="hidden" name="permissions" value={JSON.stringify(permissions)} />
                <input type="text" placeholder={data.user?.user_name} name="user_name" className={styles.username} />
                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                />
                <select name="is_active" id="isActive">
                    <option selected={data.user?.is_active}>Ativo</option>
                    <option selected={!data.user?.is_active}>Inativo</option>
                </select>
                <div className={styles.toggles}>
                    <div className={styles.switchBox}>
                        <label>
                            Vendas
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("sales")}
                            checked={permissions?.includes("sales")}
                        />
                    </div>
                    <div className={styles.switchBox}>
                        <label>
                            Finanças
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("finances")}
                            checked={permissions?.includes("finances")}
                        />
                    </div>
                    <div className={styles.switchBox}>
                        <label>
                            Marketing
                        </label>
                        <Switch
                            onChange={() => handleRoleToggle("marketing")}
                            checked={permissions?.includes("marketing")}
                        />
                    </div>
                </div>
               
                <button type="submit" disabled={pending}> {pending ? "Carregando" : "Editar Usuário"} </button>
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
export default EditUserForm;