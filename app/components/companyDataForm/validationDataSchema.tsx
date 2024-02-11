import * as yup from 'yup'
import { isValidCNPJ, isValidCPF, isValidPhone, isValidCEP } from '@brazilian-utils/brazilian-utils'
import { z } from 'zod'
// export const dataSchema = yup.object({
//     document: yup
//         .string()
//         .required('Documento é obrigatório!')
//         .transform((value) => value.replace(/[^\d]/g, ''))
//         .test('validateDocument', 'Invalid CPF/CNPJ', (value) => isValidCNPJ(value) || isValidCPF(value)),
//     corporate_name: yup
//         .string()
//         .required("Nome fantasia é obrigatório"),
//     classification: yup
//         .string()
//         .required("Classificação é obrigatório"),
//     total_employees: yup
//         .string()
//         .required("Total de colaboradores é obrigatório"),
//     phone_1: yup
//         .string()
//         .required('Número de telefone é obrigatório')
//         //.transform((value) => value.replace(/[^\d]/g, ''))
//         .test('validateMobile', 'Número inváido', (value) => isValidPhone(value)),
//     phone_2: yup
//         .string(),
//         // .transform((value) => value.replace(/[^\d]/g, '')),
//     street: yup
//         .string()
//         .required("Nome da rua é obrigatório"),
//     number: yup
//         .string()
//         .required("Número é obrigatório"),
//     complement: yup
//         .string(),
//     neighborhood: yup
//         .string()
//         .required("Bairro é obrigatório"),
//     zip_code: yup
//         .string()
//         .required("CEP é obrigatório")
//         .test('validateCEP', 'Cep inváido', (value) => isValidCEP(value)),

//     city: yup
//         .string()
//         .required("Cidade é obrigatório"),
//     state: yup
//         .string()
//         .required("Estado é obrigatório"),
//     country: yup
//         .string()
//         .required("País é obrigatório"),
    

// }).required()

export const dataSchemaZod = z.object({
    document: z
        .string()
        .min(1, { message: "Documento é obrigatório"})
        .trim()
        .transform((value) => value.replace(/[^\d]/g, '')),
        // .test('validateDocument', 'Invalid CPF/CNPJ', (value) => isValidCNPJ(value) || isValidCPF(value)),
    fantasy_name: z
        .string()
        .min(1, { message: "Nome Fantasia é obrigatório"}),
    classification: z
        .string(),
    colaborators_number: z
        .string()
        .min(1, { message: "Total de colaboradores é obrigatório"}),
    phone_1: z
        .string()
        //.transform((value) => value.replace(/[^\d]/g, ''))
        .min(1, { message: "Este campo é obrigatório"}),
        //.test('validateMobile', 'Número inváido', (value) => isValidPhone(value)),
    phone_2: z
        .optional(z.string()),
        //.transform((value) => value.replace(/[^\d]/g, '')),
    line1: z
        .string()
        .min(1, { message: "Rua é obrigatório"}),
    line2: z
        .string()
        .min(1, { message: "Número é obrigatório"}),
    line3: z
        .string(),
    neighborhood: z
        .string()
        .min(1, { message: "Bairro é obrigatório"}),
    postal_code: z
        .string()
        .min(1, { message: "CEP é obrigatório"}),
        //.test('validateCEP', 'Cep inváido', (value) => isValidCEP(value)),

    city: z
        .string()
        .min(1, { message: "Cidade é obrigatório"}),
    state: z
        .string()
        .min(1, { message: "Estado é obrigatório"}),
    country: z
        .string()
        .min(1, { message: "País é obrigatório"}),
}).refine((data) => +data.colaborators_number >= 0, {
    message: "Digite um número maior que 0",
    path:['colaborators_number']
})
    
