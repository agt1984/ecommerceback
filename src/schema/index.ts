import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets'
import rootRouter from '../routes';
import { PrismaClient } from '@prisma/client'; //configuración del cliente Prisma
import { errorMiddleware } from '../middlewares/errors';
import { SignUpSchema } from './users';

const app:Express = express(); 

app.use(express.json())//se utiliza en aplicaciones Node.js que usan Express como framework para gestionar solicitudes HTTP. Esta línea específica indica que la aplicación debe utilizar el middleware express.json()

//ahora usemos el router del login
app.use('/api', rootRouter);

//registrar en la consola eventos relacionados con consultas específicamente
//este código extiende la funcionalidad del cliente Prisma para la operación de creación de usuarios. Antes de realizar la creación, valida y 
//formatea los datos del usuario utilizando un esquema de validación llamado SignUpSchema.
export const prismaClient = new PrismaClient({ //instancia de cliente de prisma para hacer un crud
    log:['query']                              //habilito las consultas de registro
}).$extends({                                  //extiendo la funcionalidad con funciones adicionales
    query: {                                   //extiendo las capacidades de la seccion query
        user: {                                //extiendo las capacidades de operacion para obtener info de un usuario
            create({args, query}) {            //sobreescribo a create
                args.data = SignUpSchema.parse(args.data)   //aqui uso el esquema de validacion definido en 'users.ts'
                return query(args)             //valido y devuelvo los datos
            }
        }
    }
})

app.use(errorMiddleware)//se llama al middleware

//pruebo si esta operativo el puerto
app.listen(PORT, () => {console.log('App working')})