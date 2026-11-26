import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type User = {
  username: string;
  email: string;
  passwordHash: string;
  role: "player";
  createdAt: string;
};

// persistence layer: a plain JSON file with an array of users
const DB_FILE = path.resolve(import.meta.dirname, "../../db/users.json");

const readAll = async (): Promise<User[]> => {
  try {
    const content = await readFile(DB_FILE, "utf8");
    const users: unknown = JSON.parse(content);
    return Array.isArray(users) ? (users as User[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
};

// writes to a temp file and renames it so a crash never leaves a half
// written users.json
const writeAll = async (users: User[]): Promise<void> => {
  await mkdir(path.dirname(DB_FILE), { recursive: true });
  const tempFile = `${DB_FILE}.tmp`;
  await writeFile(tempFile, `${JSON.stringify(users, null, 2)}\n`, "utf8");
  await rename(tempFile, DB_FILE);
};

// every read-modify-write runs one after the other, so two registrations at
// the same time cannot overwrite each other
let queue: Promise<unknown> = Promise.resolve();
const serialize = <T>(task: () => Promise<T>): Promise<T> => {
  const result = queue.then(task, task);
  queue = result.catch(() => undefined);
  return result;
};

const sameText = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

const UserModel = {
  findByUsername: async (username: string): Promise<User | undefined> =>
    (await readAll()).find((user) => sameText(user.username, username)),

  findByEmail: async (email: string): Promise<User | undefined> =>
    (await readAll()).find((user) => sameText(user.email, email)),

  // reports a conflict instead of saving when the username or email is taken
  create: (
    data: Omit<User, "createdAt" | "role">,
  ): Promise<{ user: User } | { conflict: "username" | "email" }> =>
    serialize(async () => {
      const users = await readAll();
      if (users.some((user) => sameText(user.username, data.username))) {
        return { conflict: "username" as const };
      }
      if (users.some((user) => sameText(user.email, data.email))) {
        return { conflict: "email" as const };
      }

      const user: User = {
        ...data,
        role: "player",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      await writeAll(users);
      return { user };
    }),
};

export default UserModel;
