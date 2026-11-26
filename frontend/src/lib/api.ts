

export const API_URL =
  process.env.API_URL ?? "http://localhost:8082/api/v1";

export type SessionUser = {
  username: string;
  email: string;
  role: "player";
};

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    throw new ApiError(0, "Can't reach backend server");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(
      response.status,
      typeof data.error === "string" ? data.error : "An error ocurred",
    );
  }
  return data as T;
}

export const authApi = {
  session: () => request<{ user: SessionUser }>("/auth/session"),

  login: (username: string, password: string) =>
    request<{ user: SessionUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  register: (username: string, email: string, password: string) =>
    request<{ user: SessionUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),

  logout: () => request<void>("/auth/logout", { method: "POST" }),
};
