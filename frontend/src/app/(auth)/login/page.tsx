"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import styles from "../auth.module.css";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setSubmitting(true);
    try {
      await login(String(form.get("username")), String(form.get("password")));
      router.replace("/lobby");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
        <p>
          <label>
            Usuario
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
        </p>

        {error && <p role="alert">{error}</p>}

        <nav className={styles.links}>
          <ul>
            <li>
              <Link href="/register">¿No te has registrado?</Link>
            </li>
          </ul>
        </nav>

        <button type="submit" className={styles.submit} disabled={submitting}>
          Ingresar
        </button>
      </form>
    </main>
  );
}
