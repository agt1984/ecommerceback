//message, status code, error codes, error

//clase que extiende la clase Error.  este código crea una clase HttpException para manejar excepciones personalizadas en TypeScript, permitiendo definir mensajes, códigos de error, códigos de estado HTTP y otros errores asociados. Además, exporta un enum ErrorCodes que proporciona códigos predefinidos para algunos escenarios comunes.

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND       = 501,
    USER_ALREADY_EXIST   = 502,
    INCORRECT_PASSWORD   = 503,
    UNPROCESSABLE_ENTITY = 504,
    INTERNAL_EXCEPTION   = 505
}