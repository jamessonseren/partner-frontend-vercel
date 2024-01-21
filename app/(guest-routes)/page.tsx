"use client"

import styles from './page.module.css'


import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

   async function login(formData: FormData) {


    const { company_document, user_name, password } = Object.fromEntries(formData)

    if (!company_document || !user_name || !password) {
      alert("preencha tudo")
      return
    }

    const result = await signIn('credentials', {
      company_document,
      user_name,
      password,
      redirect: false
    })


    if (result?.error) {
      console.log({result})
      router.replace('/')
      return
    }

    router.replace('/dashboard')

  }
  return (
    <>

      <div className={styles.containerCenter}>

        <div className={styles.login}>
          {/* <Image src={logoImg} alt="Logo Correct" className={styles.logo} /> */}

          <form action={login}>
            <h1>Login</h1>
            <label htmlFor="cnpj">cnpj</label>
            <input
              placeholder="Digite o CNPJ ou CPF"
              type="text"
              name="company_document"
            />

            <label htmlFor="user_name">user_name</label>
            <input
              placeholder="Digite o nome do usuário"
              type="text"
              name="user_name"
            />
            <label htmlFor="password">password</label>
            <input
              placeholder="Digite a sua senha"
              type="password"
              name="password"
            />

            <button
              type='submit'
            >
              Acessar
            </button>

          </form>
          <Link href="/signup" className={styles.text}>Não possui conta? Cadastre-se</Link>
        </div>
      </div>

    </>
  )
}
