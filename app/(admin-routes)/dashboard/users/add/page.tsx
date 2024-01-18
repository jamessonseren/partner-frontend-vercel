// import { addUser } from "@/app/lib/actions";
'use client'

import { addUser } from '@/app/lib/actions';
import styles from './singleUser.module.css'
import Switch from 'react-switch'
import { useState } from 'react';
import Link from 'next/link';

import { IoMdArrowBack } from "react-icons/io";

const AddUserPage = () => {
  const [roles, setRoles] = useState<string[]>([]);  // let roles: string[] = []

  const handleRoleToggle = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };
  return (
    <div className={styles.container}>

      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Nome do usuário" name="username" required />
        {/* <input type="email" placeholder="email" name="email" required /> */}
        <input
          type="password"
          placeholder="Senha"
          name="password"
          required
        />
        {/* <input type="phone" placeholder="phone" name="phone" /> */}
        <div className={styles.toggles}>
          <div className={styles.switchBox}>
            <label>
              Vendas
            </label>
            <Switch
              onChange={() => handleRoleToggle("Vendas")}
              checked={roles.includes("Vendas")}
            />
          </div>
          <div className={styles.switchBox}>
            <label>
              Finanças
            </label>
            <Switch
              onChange={() => handleRoleToggle("Finanças")}
              checked={roles.includes("Finanças")}
            />
          </div>
          <div className={styles.switchBox}>
            <label>
              Marketing
            </label>
            <Switch
              onChange={() => handleRoleToggle("Marketing")}
              checked={roles.includes("Marketing")}
            />
          </div>

        </div>
        <textarea
          name="notes"
          id="notes"
          rows={16}
          placeholder="Observações"

        ></textarea>
        <button type="submit">Criar Usuário</button>
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
export default AddUserPage;