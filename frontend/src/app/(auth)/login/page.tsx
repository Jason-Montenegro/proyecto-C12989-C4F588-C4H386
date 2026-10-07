import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <form action="#" method="post">
        <section>
          <label>
            Usuario
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
            />
          </label>
        </section>
        <section>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
        </section>

        <nav>
          <ul>
            <li>
              <Link href="/register">¿No te has registrado?</Link>
            </li>
          </ul>
        </nav>

        <button type="submit">Ingresar</button>
      </form>
    </main>
  );
}
