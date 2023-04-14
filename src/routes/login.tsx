import { createEffect, createSignal } from "solid-js";
import { A, useNavigate } from "solid-start";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import authService from "~/lib/supabase/auth-service";

export default function Login() {
  const [loading, setLoading] = createSignal(false);
  const [disabled, setDisabled] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");
  const navigate = useNavigate();

  createEffect(() => {
    setDisabled(email().length === 0 || password().length === 0);
  });

  async function login() {
    setLoading(true);
    const errorMsg = await authService.login(email(), password());

    if (errorMsg) {
      setErrorMessage(errorMsg);
      setLoading(false);
      return;
    }

    navigate("/");
  }

  return (
    <>
      <div class="mx-auto mt-10 flex h-full w-5/6 flex-col gap-3 lg:w-1/3">
        <h1>Einloggen</h1>
        <Input label="E-Mail" type="email" onChange={setEmail} />
        <Input label="Password" type="password" onChange={setPassword} onEnter={login} />
        <Button onClick={login} loading={loading()} disabled={disabled()}>
          Einloggen
        </Button>
        <span class="pt-10 text-center text-sm">
          <A href="/registration">Registrieren</A> // <A href="/password">Passwort vergessen</A> //{" "}
          <A href={`/confirm/${email()}`}>Account aktivieren</A>
        </span>
      </div>
      <Alert show={errorMessage().length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage()}
      </Alert>
    </>
  );
}
