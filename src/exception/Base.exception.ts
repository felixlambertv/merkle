import { HttpStatus } from "../enum/HttpStatus.enum";

export default class BaseException extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}
