import Search from "@/app/components/search/search";
import styles from './users.module.css'
import Link from "next/link";

import { deleteUser, fetchCompanyUsers } from "@/app/lib/actions";
import Pagination from "@/app/components/pagination/pagination";
import { auth } from "@/app/lib/auth";
export type CompanyUser = {
  uuid: string
  img: string | null
  is_admin: boolean
  user_name: string
  document: string | null
  permissions: string[]
  email: string | null
  function: string | null
  status: string
  token: string
}


const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const session = await auth()
  
  const { users, count } = await fetchCompanyUsers(q, page, session!.user?.business_info_id);
 

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
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: CompanyUser) => (
            <tr key={user.uuid}>
              <td>
                <div className={styles.user}>
                  {/* <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  /> */}
                  {user.user_name}
                </div>
              </td>
              <td>
              <ul>
            {user.permissions.map((permission, index) => (
              <li key={index}>
                {permission === "sales" && "Vendas"}
                {permission === "marketing" && "Marketing"}
                {permission === "finances" && "Finanças"}
              </li>
            ))}
          </ul>
              </td>
              <td>{user.status === 'active' ? "Ativo" : "Inativo"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.uuid}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Editar
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={(user.uuid)} />
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