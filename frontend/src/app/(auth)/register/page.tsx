export default function RegisterPage() {
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
            Correo electrónico
            <input type="email" name="email" autoComplete="email" required />
          </label>
        </section>
        <section>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              required
            />
          </label>
        </section>
        <section>
          <label>
            Confirmar contraseña
            <input
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              required
            />
          </label>
        </section>

        <button type="submit">Registrarse</button>
      </form>
    </main>
  );
}
