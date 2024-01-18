'use server'

import { setupAPIClient } from "../services/api";


export async function fetchCompanyData() {
  const api = await setupAPIClient()

  try {
    const response = await api.get(`/company-data`)

    const result = response.data
    console.log({ result })
    if (result) return "Empty"
    return null
  } catch (err: any) {
    console.log("erro: ", err)
    return err.response.data.error
  }
}


export const fetchUsers = async (q: string, page: any) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 3;

};

export const fetchUser = async (id: string) => {

  try {
  } catch (err) {

  }
};

export const fetchProducts = async (q: string, page: any) => {
};

export const fetchProduct = async (id: string) => {
};

