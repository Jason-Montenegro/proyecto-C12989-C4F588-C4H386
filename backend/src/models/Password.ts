import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import ValidationError from "./ValidationError.ts";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keyLength: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;
const MIN_LENGTH = 8;
const MAX_LENGTH = 72;

const hashText = async (text: string): Promise<string> => {
  const salt = randomBytes(16);
  const derived = await scryptAsync(text, salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
};

// hashed once so a login with an unknown username takes as long as one with
// a wrong password, and does not reveal which usernames exist
const dummyHash = hashText("deadbeef");

export default class Password {
  readonly #plain: string;

  private constructor(plain: string) {
    this.#plain = plain;
  }

  static create(raw: unknown): Password {
    if (typeof raw !== "string") {
      throw new ValidationError("Password must be a string");
    }
    if (raw.length < MIN_LENGTH || raw.length > MAX_LENGTH) {
      throw new ValidationError(
        `Password must be ${MIN_LENGTH} to ${MAX_LENGTH} characters long`,
      );
    }
    return new Password(raw);
  }

  hash(): Promise<string> {
    return hashText(this.#plain);
  }

  // pass null as stored when the user does not exist; it still runs a full
  // comparison against a dummy hash and returns false
  async matches(stored: string | null): Promise<boolean> {
    const [saltHex, hashHex] = (stored ?? (await dummyHash)).split(":");
    if (!saltHex || !hashHex) return false;
    const expected = Buffer.from(hashHex, "hex");
    const actual = await scryptAsync(
      this.#plain,
      Buffer.from(saltHex, "hex"),
      expected.length,
    );
    return timingSafeEqual(actual, expected) && stored !== null;
  }
}
