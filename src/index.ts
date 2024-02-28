import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets'

const app:Express = express(); 

//get basico para robar el puerto
app.get('/', (req:Request, res:Response) => {
    res.send('Working')
})

//pruebo si esta operativo
app.listen(PORT, () => {console.log('App working')})