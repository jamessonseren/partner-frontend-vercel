"use server"

import { CompanyUser } from "../(admin-routes)/dashboard/users/page"
import { dataSchemaZod } from "../components/companyDataForm/validationDataSchema"
import { setupAPIClient } from "../services/api"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function fetchCompanyData() {
  const api = await setupAPIClient()

  try {
    const response = await api.get(`/company-data`)

    const result = response.data
    return result
  } catch (err: any) {
    console.log("erro: ", err)
    return err.response.data.error
  }
}


export const addCompanyData = async (formData: FormData) => {

  const {
    document,
    corporate_name,
    classification,
    total_employees,
    phone_1,
    phone_2,
    zip_code,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    country
  } = Object.fromEntries(formData)

  const result = dataSchemaZod.safeParse({
    document,
    corporate_name,
    classification,
    total_employees,
    phone_1,
    phone_2,
    zip_code,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    country
  })
  if (!result.success) {
    return { error: result.error.issues }
  }

  //chamar api para salvar os dados da empresa
}
export const fetchSingleUser = async (user_uuid: string) => {

  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-user?user_uuid=${user_uuid}`);

    return response.data
  } catch (err: any) {
    console.log({ err });
  }
};

export const fetchCompanyUsers = async (q: string, page: any, business_document: string) => {
  const result: { count?: number; users?: CompanyUser[]; error?: string } = {};
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-users?business_document=${business_document}`);
    const users = response.data
      .filter((user: CompanyUser) => regex.test(user.user_name))
      .slice(ITEM_PER_PAGE * (page - 1), ITEM_PER_PAGE * page);


    return { count: users.length, users }
  } catch (err: any) {

    console.log({ err });
    throw new Error("Failed to fetch company secondary users!");
  }
};

export const addUser = async (formData: FormData) => {
  const api = await setupAPIClient();

  const { user_name, password, permissions } = Object.fromEntries(formData)
  const parsedPermissions = typeof permissions === 'string' ? JSON.parse(permissions) : [];
  try {
    await api.post("/company-user", {

      password,
      user_name,
      permissions: parsedPermissions
    })



  } catch (err: any) {
    console.log("Erro ao criar usuário", err)
  }
  revalidatePath('/dashboard/users')
  redirect('/dashboard/users')
}

export const editUser = async (formData: FormData) => {
  const api = await setupAPIClient()

  const { user_id, password, permissions, is_active } = Object.fromEntries(formData)
  const parsedPermissions = typeof permissions === 'string' ? JSON.parse(permissions) : [];
  const active = is_active === "Ativo" ? true : false

  try {
    await api.put(`/company-user?user_id=${user_id}`, {
      password,
      permissions: parsedPermissions,
      is_active: active
    })

  } catch (err: any) {
    console.log("Erro ao editar usuário: ", err)
  }
  revalidatePath('/dashboard/users')
  redirect('/dashboard/users')

}

export const deleteUser = async (formData: FormData) => {
  const api = await setupAPIClient()

  const { id, business_document } = Object.fromEntries(formData)
  try {
    await api.delete(`/company-user?user_id=${id}&business_document=${business_document}`)

  } catch (err: any) {
    console.log("Erro ao deletar usuário: ", err)
    

  }
  revalidatePath('/dashboard/users')
}