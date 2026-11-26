import ValidationError from "./ValidationError.ts";

const PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

export default class Username {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: unknown): Username {
    if (typeof raw !== "string") {
      throw new ValidationError("Username must be a string");
    }
    const value = raw.normalize("NFKC").trim();
    if (!PATTERN.test(value)) {
      throw new ValidationError(
        "Username must be 3 to 20 characters long: letters, numbers or _",
      );
    }
    return new Username(value);
  }
}
