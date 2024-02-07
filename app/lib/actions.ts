"use server"

import { CompanyUser } from "../(admin-routes)/dashboard/users/page"
import { dataSchemaZod } from "../components/companyDataForm/validationDataSchema"
import { setupAPIClient } from "../services/api"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "./auth"


export async function fetchCompanyData(business_info_id: string | undefined) {
  const api = await setupAPIClient()

  try {
    const response = await api.get(`/company-data?business_id=${business_info_id}`)

    const result = response.data
    return result
  } catch (err: any) {
    console.log("erro: ", err)
    // return err.response.data.error
  }
}

export const fetchCompanyAddress = async (address_uuid: string) => {
  const api = await setupAPIClient()

  try {
    const response = await api.get(`/company-address?address_id=${address_uuid}`)

    const result = response.data
    return result
  } catch (err: any) {
    console.log("erro: ", err)
    // return err.response.data.error
  }

}


export const updateData = async (formData: FormData) => {
  const api = await setupAPIClient();

  const {
    data_uuid,
    address_uuid,
    line1,
    line2,
    line3,
    postal_code,
    neighborhood,
    city,
    state,
    country,
    fantasy_name,
    document,
    classification,
    colaborators_number,
    phone_1,
    phone_2


  } = Object.fromEntries(formData)

  // if(!document 
  //   || !fantasy_name 
  //   || !classification 
  //   || !colaborators_number 
  //   || !phone_1 
  //   || !postal_code
  //   || !line1
  //   || !line2
  //   || !neighborhood
  //   || !city
  //   || !state
  //   || !country
  //   ) {console.log("data missing")}
  const result = dataSchemaZod.safeParse({
    line1,
    line2,
    line3,
    postal_code,
    neighborhood,
    city,
    state,
    country,
    fantasy_name,
    document,
    classification,
    colaborators_number,
    phone_1,
    phone_2
  })
  if (!result.success) {
    return { error: result.error.issues }
  }

  let colaborators_int = +colaborators_number


  try {
    await api.put(`/company-info?data_uuid=${data_uuid}&address_uuid=${address_uuid}`, {
      line1,
      line2,
      line3,
      postal_code,
      neighborhood,
      city,
      state,
      country,
      fantasy_name,
      document,
      classification,
      colaborators_number: colaborators_int,
      phone_1,
      phone_2
    })
  } catch (err: any) {
    console.log("Unable to update data", err)

  }
  //chamar api para salvar os dados da empresa
  revalidatePath('/dashboard/settings/company')
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

export const fetchCompanyUsers = async (q: string, page: any, business_info_uuid: string) => {
  const result: { count?: number; users?: CompanyUser[]; error?: string } = {};
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  const api = await setupAPIClient();

  try {
    const response = await api.get(`/company-users?business_info_uuid=${business_info_uuid}`);
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
  const session = await auth()

  const { user_id, password, permissions, is_active } = Object.fromEntries(formData)
  const parsedPermissions = typeof permissions === 'string' ? JSON.parse(permissions) : [];
  const active = is_active === "Ativo" ? true : false

  try {
    await api.put(`/company-user?user_id=${user_id}&business_document=${session?.user.document}`, {
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

export const fetchCompanyUserDetails = async() => {
  const api = await setupAPIClient()
  const session = await auth()
  try{
    if(session) {
      const userData = await api.get("/company-user-details")

      return userData.data
    }
  }catch(err: any){
    console.log(err)
  }
}
