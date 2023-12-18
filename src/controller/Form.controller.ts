import { FormRequest } from "./../request/Form.request";
import { IFormService } from "./../service/Form.service";
import { Request, Response } from "express";
import { BaseController } from "./Base.controller";
import { HttpStatus } from "../enum/HttpStatus.enum";
export class FormController extends BaseController {
  constructor(private formService: IFormService) {
    super();
  }

  async createForm(req: Request, res: Response): Promise<void> {
    try {
      const request: FormRequest = req.body;
      const data = await this.formService.createForm(request);
      this.successResponse(
        res,
        "Success create form",
        HttpStatus.CREATED,
        data
      );
    } catch (error) {
      this.errorResponse(res, error);
    }
  }

  async getAllForm(req: Request, res: Response): Promise<void> {
    try {
      const userPayload = req.currentUser;
      const data = await this.formService.getAllForm(userPayload);
      this.successResponse(res, "Success get form", HttpStatus.OK, data);
    } catch (error) {
      this.errorResponse(res, error);
    }
  }
}
