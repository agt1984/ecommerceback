import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../schema/secrets";
import { prismaClient } from "../schema";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
// 1. extreaer el token del header
const token = req.headers.authorization as any //aqui lo puse as any para evitar el error
// 2. si el token no esta presente, lanzar un error de no autorizado
if(!token) {
  next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}
try {
  // 3. si el token esta presente, verifica ese token y extrae el payload
  const payload = jwt.verify(token, JWT_SECRET) as any
  // 4. para obtener el usuario del payload
  const user = await prismaClient.user.findFirst({where: {id: payload.userId}})
  if (!user) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
  }else{
     // 5. pegar el usuario al objeto del request
    req.user = user
    next()
  }
 
}
catch (error) {
  next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
}

};

export default authMiddleware;
