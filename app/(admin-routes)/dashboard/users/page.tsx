// import { fetchUsers } from "@/app/lib/data";
// import Pagination from "@/app/components/pagination/pagination";
import Search from "@/app/components/search/search";
import styles from './users.module.css'
import Image from "next/image";
import Link from "next/link";

import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchCompanySecondaryUsers, fetchCompanySingleUser } from "@/app/lib/actions";
import Pagination from "@/app/components/pagination/pagination";
// import { useContext } from "react";
// import { AuthContext } from "@/app/contexts/authContext";
export type CompanyUser = {
  img: string
  id: string;
  fullName: string | null;
  user_name: string;
  roles: string[]; // ou o tipo específico para roles, dependendo do que contém
  permissions: string[]; // ou o tipo específico para permissions, dependendo do que contém
  user_code: string;
  client_admin: boolean;
  email: string | null;
  cnpj: string;
  cpf: string | null;
  function: string | null;
  // outros campos, se aplicável
};

type ResultProps = {
  count: number | undefined
  users: CompanyUser[] | undefined
  error: string | undefined
}
const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const session  = await getServerSession(nextAuthOptions)
  
  const {users, count} = await fetchCompanySingleUser(q, page, session!.user.user_code);
  
  return (
<div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar por usuário..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Adicionar novo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Permissões</td>
            {/* <td>Criado em</td> */}
            {/* <td>Role</td>
            <td>Status</td>
            <td>Action</td> */}
          </tr>
        </thead>
        <tbody>
          {users?.map((user: CompanyUser) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.user_name}
                </div>
              </td>
              <td>{user.permissions}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              {/* <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" value={(user.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Deletar
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>  );
};

export default UsersPage;