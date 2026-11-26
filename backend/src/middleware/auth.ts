import { type NextFunction, type Request, type Response } from "express";

import AuthService from "../services/AuthService.ts";
import { readSessionCookie } from "../controllers/auth.controller.ts";

// middleware which validates that the user is logged
const requireLogged = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.locals.user = await AuthService.getSession(readSessionCookie(req));
  } catch {
    res.status(401).json({ error: "User not logged" });
    return;
  }
  next();
};

export default requireLogged;
