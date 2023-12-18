import { BaseResponse } from "../response/Base.response";
import { Response } from "express";
import BaseException from "../exception/Base.exception";
import { config } from "../config/Vars.config";

export abstract class BaseController {
  protected successResponse(
    res: Response,
    message: string,
    status: number,
    data?: any
  ): void {
    const response: BaseResponse = {
      success: true,
      message: message,
      data: data,
    };
    res.status(status).json(response);
  }

  //Any expcetion other than from BaseException or extend from there will be throw unexpected exception
  protected errorResponse(res: Response, error: any): void {
    if (error instanceof BaseException) {
      const err = error as BaseException;
      const response: BaseResponse = {
        success: false,
        message: err.message,
      };
      res.status(err.statusCode).json(response);
    } else {
      const response: BaseResponse = {
        success: false,
        message: config.debug
          ? "An unexpected error occurred. Please try again later."
          : error.message,
      };
      res.status(500).json(response);
    }
  }
}
