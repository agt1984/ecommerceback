import { HttpException } from "./root";

//error lanzado cuando el usuario no es autorizado
export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: number, errors?: any,) {
        super(message, errorCode, 506, errors)
    }
}