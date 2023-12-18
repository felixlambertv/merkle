import { User } from "./../model/User.model";
import { IUserRepository } from "./../repositories/User.repository";
import { AuthService, IAuthService } from "./../service/Auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginRequest } from "../request/Auth.request";
import { InvalidCredential } from "../exception/InvalidCredential.exception";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth Service Test", () => {
  let authService: IAuthService;
  let userRepoMock: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepoMock = {
      findUserByUserName: jest.fn(),
    };
    authService = new AuthService(userRepoMock);
  });

  describe("login", () => {
    const mockUser: User = {
      id: 1,
      username: "admin",
      password: "default",
    };

    const loginRequest: LoginRequest = {
      username: mockUser.username,
      password: mockUser.password,
    };

    it("should successfully login with correct email and password", async () => {
      userRepoMock.findUserByUserName.mockResolvedValueOnce(mockUser);
      (bcrypt.compare as jest.MockedFunction<any>).mockResolvedValueOnce(true);
      (jwt.sign as jest.MockedFunction<any>)
        .mockReturnValueOnce("mockAccessToken")
        .mockReturnValueOnce("mockRefreshToken");

      const result = await authService.login(loginRequest);
      expect(result).toHaveProperty("tokens");
      expect(result).toHaveProperty("user");
      expect(result.tokens).toBe("mockAccessToken");
    });

    it("should throw InvalidCredential error when password is incorrect", async () => {
      userRepoMock.findUserByUserName.mockResolvedValueOnce(mockUser);
      (bcrypt.compare as jest.MockedFunction<any>).mockResolvedValueOnce(false);
      await expect(authService.login(loginRequest)).rejects.toThrow(
        InvalidCredential
      );
    });

    it("should throw InvalidCredential error when username is not found", async () => {
      userRepoMock.findUserByUserName.mockResolvedValueOnce(null);
      await expect(authService.login(loginRequest)).rejects.toThrow(
        InvalidCredential
      );
    });
  });
});
