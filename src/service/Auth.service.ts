import { IUserRepository } from "./../repositories/User.repository";
import { LoginRequest } from "../request/Auth.request";
import { LoginResponse } from "../response/Auth.response";
import bcrypt from "bcryptjs";
import { InvalidCredential } from "../exception/InvalidCredential.exception";
import { UserPayload } from "../types/types";
import jwt from "jsonwebtoken";
import { config } from "../config/Vars.config";

export interface IAuthService {
  login(request: LoginRequest): Promise<LoginResponse>;
}

export class AuthService implements IAuthService {
  constructor(private userRepo: IUserRepository) {}
  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepo.findUserByUserName(request.username);
    if (!user || !(await bcrypt.compare(request.password, user.password))) {
      throw new InvalidCredential();
    }

    const userPayload: UserPayload = {
      userId: user.id!,
      username: user.username,
    };

    const accessToken = jwt.sign(userPayload, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpiry,
    });

    const loginResponse: LoginResponse = {
      tokens: accessToken,
      user: userPayload,
    };
    return loginResponse;
  }
}
