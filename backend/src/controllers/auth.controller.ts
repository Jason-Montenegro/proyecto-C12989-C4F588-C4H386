import { type CookieOptions, type Request, type Response } from "express";

import AuthService, {
  AuthError,
  invalidCredentials,
  type LoginInput,
  type RegisterInput,
} from "../services/AuthService.ts";
import {
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  type SessionUser,
} from "../models/SessionToken.ts";
import Username from "../models/Username.ts";
import Email from "../models/Email.ts";
import Password from "../models/Password.ts";
import ValidationError from "../models/ValidationError.ts";

const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

const startSession = (res: Response, user: SessionUser) => {
  res.cookie(SESSION_COOKIE, AuthService.createToken(user), {
    ...cookieOptions(),
    maxAge: SESSION_DURATION_SECONDS * 1000,
  });
};

const sendError = (res: Response, error: unknown) => {
  if (error instanceof AuthError || error instanceof ValidationError) {
    res.status(error.status).json({ error: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

const parseRegister = (body: Request["body"]): RegisterInput => ({
  username: Username.create(body?.username),
  email: Email.create(body?.email),
  password: Password.create(body?.password),
});

const parseLogin = (body: Request["body"]): LoginInput => {
  // credentials that break the registration rules cannot belong to any user,
  // so they get the same answer as a wrong password
  try {
    return {
      username: Username.create(body?.username),
      password: Password.create(body?.password),
    };
  } catch (error) {
    if (error instanceof ValidationError) throw invalidCredentials();
    throw error;
  }
};

const readSessionCookie = (req: Request): string | undefined => {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  return typeof token === "string" ? token : undefined;
};

const AuthController = {
  // POST /register: creates the user and logs them in right away
  register: async (req: Request, res: Response) => {
    try {
      const user = await AuthService.register(parseRegister(req.body));
      startSession(res, user);
      res.status(201).json({ user });
    } catch (error) {
      sendError(res, error);
    }
  },

  // POST /login
  login: async (req: Request, res: Response) => {
    try {
      const user = await AuthService.login(parseLogin(req.body));
      startSession(res, user);
      res.status(200).json({ user });
    } catch (error) {
      sendError(res, error);
    }
  },

  // POST /logout: always succeeds, even without a session
  logout: (req: Request, res: Response) => {
    AuthService.logout(readSessionCookie(req));
    res.clearCookie(SESSION_COOKIE, cookieOptions());
    res.status(204).end();
  },

  // GET /session: runs after requireLogged, which sets res.locals.user
  session: (_req: Request, res: Response) => {
    res.status(200).json({ user: res.locals.user as SessionUser });
  },
};

export { readSessionCookie };
export default AuthController;
