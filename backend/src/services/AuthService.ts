import UserModel, { type User } from "../models/User.ts";
import SessionToken, { type SessionUser } from "../models/SessionToken.ts";
import type Username from "../models/Username.ts";
import type Email from "../models/Email.ts";
import type Password from "../models/Password.ts";

// error with an HTTP status the controller can send as is
export class AuthError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const invalidCredentials = () =>
  new AuthError(401, "Invalid username or password");

const notLoggedIn = () => new AuthError(401, "You are not logged in");

export type RegisterInput = {
  username: Username;
  email: Email;
  password: Password;
};

export type LoginInput = {
  username: Username;
  password: Password;
};

const toSessionUser = (user: User): SessionUser => ({
  username: user.username,
  email: user.email,
  role: user.role,
});

const AuthService = {
  register: async ({
    username,
    email,
    password,
  }: RegisterInput): Promise<SessionUser> => {
    const result = await UserModel.create({
      username: username.value,
      email: email.value,
      passwordHash: await password.hash(),
    });
    if ("conflict" in result) {
      throw new AuthError(
        409,
        result.conflict === "username"
          ? "That username is already taken"
          : "That email address is already registered",
      );
    }
    return toSessionUser(result.user);
  },

  login: async ({ username, password }: LoginInput): Promise<SessionUser> => {
    const user = await UserModel.findByUsername(username.value);
    const valid = await password.matches(user?.passwordHash ?? null);
    if (!user || !valid) throw invalidCredentials();
    return toSessionUser(user);
  },

  createToken: (user: SessionUser): string => SessionToken.create(user.username),

  getSession: async (token: string | undefined): Promise<SessionUser> => {
    const payload = token ? SessionToken.verify(token) : null;
    if (!payload) throw notLoggedIn();

    const user = await UserModel.findByUsername(payload.username);
    if (!user) throw notLoggedIn();
    return toSessionUser(user);
  },

  logout: (token: string | undefined): void => {
    if (token) SessionToken.revoke(token);
  },
};

export default AuthService;
