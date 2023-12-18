import { AuthService, IAuthService } from "./../service/Auth.service";
import {
  IUserRepository,
  UserRepository,
} from "./../repositories/User.repository";
import { Database } from "sqlite3";
import { FormService, IFormService } from "./../service/Form.service";
import {
  FormRepository,
  IFormRepository,
} from "./../repositories/Form.repository";
import { FormController } from "../controller/Form.controller";
import { AuthController } from "../controller/Auth.controller";

//All dependency injection handled here
export function initDependency(db: Database): Record<string, any> {
  const formRepository: IFormRepository = new FormRepository(db);
  const formService: IFormService = new FormService(formRepository);
  const formController: FormController = new FormController(formService);

  const userRepository: IUserRepository = new UserRepository(db);
  const authService: IAuthService = new AuthService(userRepository);
  const authController: AuthController = new AuthController(authService);

  return {
    formController,
    authController,
  };
}
