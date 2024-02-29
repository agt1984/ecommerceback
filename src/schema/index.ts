import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets'
import rootRouter from '../routes';

const app:Express = express(); 

//ahora usemos el router del login
app.use('/api', rootRouter);

//pruebo si esta operativo
app.listen(PORT, () => {console.log('App working')})