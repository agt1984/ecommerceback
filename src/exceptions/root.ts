//message, status code, error codes, error

class HttpException extends Error {
  message:    string;
  errorCode:  any;
  statusCode: number;
  errors:     any;

  constructor(message: string, errorCode: any, statusCode: number, error: any) {
    super(message)
    this.message    = message
    this.errorCode  = errorCode
    this.statusCode = statusCode
    this.errors     = error
  }
}

export enum ErrorCodes {
    USER_NOT_FOUND     = 501,
    USER_ALREADY_EXIST = 502,
    INCORRECT_PASSWORD = 503,
}