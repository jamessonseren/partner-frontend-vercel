import { z } from "zod";


export const userInfoSchemaFirstSignIn = z.object({
    document: z
        .string()
        .min(13, { message: "Este campo é obrigatório" })
        .trim()
        .transform((value) => value.replace(/[^\d]/g, '')),
    new_password: z
        .string()
        .min(1, { message: "Este campo é obrigatório" }),
    confirm_password: z
        .string()

}).refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"]
})

export const userInfoSchema = z.object({
    name: z
        .string()
        .optional(),
    document: z
        .string()
        .optional(),
    user_name: z
        .string()
        .optional(),
    new_password: z
        .string()
        .trim()
        .optional(),
    confirm_password: z
        .string()
        .optional()

}).refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"]
}).refine((data) => {
    // Verifica se todos os campos estão vazios, incluindo undefined
    const allFieldsEmpty = Object.values(data).every(value => !value);
    return !allFieldsEmpty;
}, {
    message: "Nenhum campo foi preenchido",
    path: ["all_empty"]
});
