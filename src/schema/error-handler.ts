import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorHandler = (method: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            method(req, res, next)
        } catch(error: any) {
            let exception: HttpException;
            if( error instanceof HttpException ){
                exception = error;
            }
        }

    }
}
