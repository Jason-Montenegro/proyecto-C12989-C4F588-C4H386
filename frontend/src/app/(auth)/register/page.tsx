import styles from "../auth.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Registrarse</h1>
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
              required
            />
          </label>
        </p>

        <button type="button" className={styles.submit}>
          Registrarse
        </button>
      </form>
    </main>
  );
}
