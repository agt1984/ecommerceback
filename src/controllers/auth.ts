//importa las interfaces Request y Response de Express para ser utilizadas en el código.
import { Request, Response } from "express";
import { prismaClient } from "../schema";
import { hashSync } from 'bcrypt';

//La función sign up, para crear usuario toma dos parámetros, req y res, que representan la solicitud y la respuesta respectivamente.
export const signup = async (req:Request, res:Response) => {
    const {email, password, name} = req.body;

    let user = await prismaClient.user.findFirst({ where: {email}})
    if (user) {
        throw Error('User already exists!')
    }

    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}