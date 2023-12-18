import { AuthController } from "./../controller/Auth.controller";
import express, { Request, Response, Router } from "express";
import { Database } from "sqlite3";
import { FormController } from "../controller/Form.controller";
import { initDependency } from "../di/DependencyInjection";
import { checkJwt } from "../middleware/Auth.middleware";

export default function bindRoutes(db: Database): Router {
  //HEALTH ROUTER
  const healthRouter = express.Router();
  healthRouter.get("/health", (req: Request, res: Response) => {
    res.send("OK");
  });

  // Controller from DI
  const { formController, authController } = initDependency(db) as {
    formController: FormController;
    authController: AuthController;
  };

  //FORM ROUTER
  const formRouter = express.Router();
  formRouter.post("/forms", (req: Request, res: Response) => {
    formController.createForm(req, res);
  });
  formRouter.get("/forms", checkJwt, (req: Request, res: Response) => {
    formController.getAllForm(req, res);
  });

  //AUTH ROUTER
  const authRouter = express.Router();
  authRouter.post("/login", (req: Request, res: Response) => {
    authController.login(req, res);
  });

  const v1Router = express.Router();
  v1Router.use("/api/v1", healthRouter, formRouter, authRouter);
  return v1Router;
}
