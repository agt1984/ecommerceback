import dotenv from 'dotenv';

dotenv.config({path:'.env'}) //especificamos el archivo a configurar

export const PORT       = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET! //Se pide que se defina como STRING O VOID, la exclamacion la final lo declaa como string