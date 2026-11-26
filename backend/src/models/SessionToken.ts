import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

import { type User } from "./User.ts";

export const SESSION_COOKIE = "session";
export const SESSION_DURATION_SECONDS = 30 * 60; // 30 minutes

export type SessionUser = {
  username: string;
  email: string;
  role: User["role"];
};

type SessionPayload = {
  username: string;
  tokenId: string;
  expiresAt: number;
};

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
};

// a JWT cannot be deleted, so logged-out token ids are kept until they would
// expire anyway; this list lives in memory and is lost on restart
const revokedTokens = new Map<string, number>();

const SessionToken = {
  create: (username: string): string =>
    jwt.sign({}, getSecret(), {
      subject: username,
      jwtid: randomUUID(),
      expiresIn: SESSION_DURATION_SECONDS,
      algorithm: "HS256",
    }),

  verify: (token: string): SessionPayload | null => {
    try {
      const payload = jwt.verify(token, getSecret(), {
        algorithms: ["HS256"],
      });
      if (
        typeof payload === "string" ||
        !payload.sub ||
        !payload.jti ||
        !payload.exp ||
        revokedTokens.has(payload.jti)
      ) {
        return null;
      }

      return {
        username: payload.sub,
        tokenId: payload.jti,
        expiresAt: payload.exp,
      };
    } catch {
      return null;
    }
  },

  revoke: (token: string): void => {
    const payload = SessionToken.verify(token);
    if (!payload) return;

    const now = Date.now() / 1000;
    for (const [tokenId, expiresAt] of revokedTokens) {
      if (expiresAt < now) revokedTokens.delete(tokenId);
    }
    revokedTokens.set(payload.tokenId, payload.expiresAt);
  },
};

export default SessionToken;
