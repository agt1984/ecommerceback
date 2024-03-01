//Aqui se está utilizando Express en Node.js para definir rutas relacionadas con la autenticación
import {Router} from 'express'              //Importa el módulo Router de Express para poder crear instancias de rutas en la aplicación
import { signup } from '../controllers/auth' //Importa la función login desde el archivo '../controllers/auth', lo que significa que se está llamando a esta función cuando se accede a la ruta '/login'.

const authRoutes:Router = Router()          //Crea una instancia de una nueva ruta utilizando el método Router() de Express y la asigna a la variable authRoutes.

authRoutes.post('/signup',signup)           //Define una ruta HTTP post en la instancia de ruta authRoutes que responde a las solicitudes en la URL '/login' llamando a la función login importada anteriormente

export default authRoutes