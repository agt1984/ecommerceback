import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets'
import rootRouter from '../routes';
import { PrismaClient } from '@prisma/client'; //configuración del cliente Prisma

const app:Express = express(); 

app.use(express.json())

//ahora usemos el router del login
app.use('/api', rootRouter);

//registrar en la consola eventos relacionados con consultas específicamente
export const prismaClient = new PrismaClient({
    log:['query']
})

//pruebo si esta operativo el puerto
app.listen(PORT, () => {console.log('App working')})