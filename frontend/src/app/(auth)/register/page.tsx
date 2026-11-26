"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));

    if (password !== String(form.get("confirm-password"))) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await register(
        String(form.get("username")),
        String(form.get("email")),
        password,
      );
      router.replace("/lobby");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Registrarse</h1>
      <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
        <p>
          <label>
            Usuario
            <input
              type="text"
              name="username"
              autoComplete="username"
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              title="Entre 3 y 20 caracteres: letras, números o _"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Correo electrónico
            <input type="email" name="email" autoComplete="email" required />
          </label>
        </p>
        <p>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Confirmar contraseña
            <input
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
            />
          </label>
        </p>

        {error && <p role="alert">{error}</p>}

        <nav className={styles.links}>
          <ul>
            <li>
              <Link href="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </li>
          </ul>
        </nav>

        <button type="submit" className={styles.submit} disabled={submitting}>
          Registrarse
        </button>
      </form>
    </main>
  );
}
