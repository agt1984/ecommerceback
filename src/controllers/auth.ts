//importa las interfaces Request y Response de Express para ser utilizadas en el código.
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../schema";
import { hashSync, compareSync } from 'bcrypt'; //hashSync para encriptar, compareSync para comparar
import * as jwt from 'jsonwebtoken'; //importo la libreria para tokenizar la clave
import { JWT_SECRET } from "../schema/secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

//La función sign up, para crear usuario toma dos parámetros, req y res, que representan la solicitud y la respuesta respectivamente.
export const signup = async (req:Request, res:Response, next: NextFunction) => {
    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;

    //se verifica si el correo ya esta en la base de datos
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      next(
        new BadRequestException(
          "User already Exists!",
          ErrorCode.USER_ALREADY_EXIST
        )
      ); //si esta el correo se le bota de la autenticacion
    }
    //se espera del usuario nombre, correo y mail
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    res.json(user);
   
}

//para el login se deben comparar las claves, ademas solo requiere dos parametros, el email y clave
export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    //se verifica si el correo ya esta en la base de datos
    let user = await prismaClient.user.findFirst({ where: {email}})
    if (!user) {
        throw Error('User does not exists!') //si esta el correo se le bota de la autenticacion
    }
    if(!compareSync(password, user.password)) {
        throw Error('Incorrect password!')
    }
    const token = jwt.sign({ //esta parte del codigo se encarga de decodificar el password
        userId: user.id
    },JWT_SECRET)

    res.json({user, token})
}