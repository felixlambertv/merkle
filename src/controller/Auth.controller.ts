import { HttpStatus } from "../enum/HttpStatus.enum";
import { LoginRequest } from "../request/Auth.request";
import { IAuthService } from "../service/Auth.service";
import { BaseController } from "./Base.controller";
import { Request, Response } from "express";

export class AuthController extends BaseController {
  constructor(private authService: IAuthService) {
    super();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const request: LoginRequest = req.body;
      const data = await this.authService.login(request);
      this.successResponse(res, "Success login", HttpStatus.OK, data);
    } catch (error) {
      this.errorResponse(res, error);
    }
  }
}
