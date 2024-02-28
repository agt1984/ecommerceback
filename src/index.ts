import express, {Express, Request, Response} from 'express';

const app:Express = express(); 

//get basico para robar el puerto
app.get('/', (req:Request, res:Response) => {
    res.send('Working')
})

//pruebo si esta operativo
app.listen(3000, () => {console.log('App working')})