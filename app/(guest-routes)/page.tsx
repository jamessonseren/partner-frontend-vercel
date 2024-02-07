"use client"

import styles from './page.module.css'
import {z} from 'zod';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

   async function login(formData: FormData) {


    const { business_document, credential, password } = Object.fromEntries(formData)
    if (!business_document || !credential || !password) {
      alert("preencha tudo")
      return
    }

    let emailValue = ''
    let user_name = ''
   
    
    const emailValidation = z.string().email().safeParse(credential)
    if(emailValidation.success) {
      emailValue = emailValidation.data
      
    }else{
      user_name = credential as string
      emailValue = ''
    }

    const result = await signIn('credentials', {
      business_document,
      email: emailValue,
      user_name,
      password,
      redirect: false
    })


    if (result?.error) {
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
            <label htmlFor="document">CNPJ / CPF</label>
            <input
              type="text"
              name="business_document"
            />

            <label htmlFor="user_name">Email ou nome de usuário</label>
            <input
              type="text"
              name="credential"
            />
            <label htmlFor="password">Senha</label>
            <input
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
