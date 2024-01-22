// import { fetchUsers } from "@/app/lib/data";
// import Pagination from "@/app/components/pagination/pagination";
import Search from "@/app/components/search/search";
import styles from './users.module.css'
import Image from "next/image";
import Link from "next/link";

import { fetchCompanyUsers } from "@/app/lib/actions";
import Pagination from "@/app/components/pagination/pagination";
import { auth } from "@/app/lib/auth";
// import { useContext } from "react";
// import { AuthContext } from "@/app/contexts/authContext";
export type CompanyUser = {
  id: string
  img: string | null
  isAdmin: boolean
  user_name: string
  company_document: string
  document: string | null
  isClient: boolean
  permissions: string[]
  user_code: string
  email: string | null
  function: string | null
  token: string
}

type ResultProps = {
  count: number | undefined
  users: CompanyUser[] | undefined
  error: string | undefined
}
const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const session = await auth()

  const { users, count } = await fetchCompanyUsers(q, page, session!.user.user_code);

 

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
    </div>);
};

export default UsersPage;