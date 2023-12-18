import { HttpStatus } from "../enum/HttpStatus.enum";
import BaseException from "./Base.exception";

export class InvalidCredential extends BaseException {
  constructor() {
    super("Invalid credential", HttpStatus.BAD_REQUEST);
  }
}
