import ValidationError from "./ValidationError.ts";

const PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class Email {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: unknown): Email {
    if (typeof raw !== "string") {
      throw new ValidationError("Email address must be a string");
    }
    const value = raw.normalize("NFKC").trim().toLowerCase();
    if (!PATTERN.test(value)) {
      throw new ValidationError("Email address is not valid");
    }
    return new Email(value);
  }
}
