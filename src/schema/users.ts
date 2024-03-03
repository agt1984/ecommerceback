import {z} from 'zod' //bibliote que se usa para esquemas de validacion con typescript

//para validar datos asociados con el proceso de registro
//esta sintaxis es caracteristica de zod para la validacion de datos
export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})