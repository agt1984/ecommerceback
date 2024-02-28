//importa las interfaces Request y Response de Express para ser utilizadas en el código.
import { Request, Response } from "express";

//La función login toma dos parámetros, req y res, que representan la solicitud y la respuesta respectivamente.
export const login = (req:Request, res:Response) => {
    res.send('login works'); //avisa que el login funciono
}