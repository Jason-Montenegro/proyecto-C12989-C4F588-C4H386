import Link from "next/link";
import styles from "../auth.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={`card ${styles.form}`}>
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

        <nav className={styles.links}>
          <ul>
            <li>
              <Link href="/register">¿No te has registrado?</Link>
            </li>
          </ul>
        </nav>

        <button type="button" className={styles.submit}>
          Ingresar
        </button>
      </form>
    </main>
  );
}
