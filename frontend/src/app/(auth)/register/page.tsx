export default function RegisterPage() {
  return (
    <main>
      <h1>Registrarse</h1>
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

        <button type="button">Registrarse</button>
      </form>
    </main>
  );
}
