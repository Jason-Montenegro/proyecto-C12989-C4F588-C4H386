import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <form>
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

        <nav>
          <ul>
            <li>
              <Link href="/register">¿No te has registrado?</Link>
            </li>
          </ul>
        </nav>

        <button type="button">Ingresar</button>
      </form>
    </main>
  );
}
