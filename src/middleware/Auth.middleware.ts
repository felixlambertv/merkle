import { Request, Response, NextFunction } from "express";
import { config } from "../config/Vars.config";
import { UserPayload } from "../types/types";
import jwt from "jsonwebtoken";

//Check for JWT token, will assign the data when token exists and valid
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    req.currentUser = null;
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, config.accessTokenSecret) as UserPayload;
    req.currentUser = payload;
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  next();
};
