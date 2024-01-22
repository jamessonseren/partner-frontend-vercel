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
export const fetchCompanySecondaryUsers = async (page: any, user_code: string) => {

  const ITEM_PER_PAGE = 3;
  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-users?user_code=${user_code}`);
    const users = response.data.slice(ITEM_PER_PAGE * (page - 1), ITEM_PER_PAGE * page);
    return { count: response.data.length, users };
  } catch (err: any) {
    console.log({ err });
    throw new Error("Failed to fetch company secondary users!");
  }
};

export const fetchCompanyUsers = async (q: string, page: any, user_code: string) => {
  const result: { count?: number; users?: CompanyUser[]; error?: string } = {};
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-users?user_code=${user_code}`);
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