import { useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { supabase, translateError } from "~/lib/supabase/supabase-client";

export default function Activate() {
  const params = useParams();
  const navigate = useNavigate();
  const [code, setCode] = createSignal("");
  const [email, setEmail] = createSignal(params.email);
  const [errorMessage, setErrorMessage] = createSignal("");

  async function activate() {
    const { error } = await supabase.auth.verifyOtp({
      email: email(),
      token: code(),
      type: "signup"
    });

    if (error) {
      setErrorMessage(translateError(error));
      return;
    }

    navigate("/");
  }

  return (
    <section class="flex flex-col gap-8 p-6">
      <h1>Aktiviere deinen Account!</h1>
      <p>Wir haben dir an deine E-Mail einen Aktivierungscode geschickt. Gib diesen bitte hier ein:</p>
      <Input label="Deine E-Mail" value={email()} onChange={setEmail} />
      <Input label="Aktivierungscode" centerText letterSpacing onChange={setCode} maxlength="6" />
      <div class="grid grid-cols-2 gap-4 pt-6">
        <Button disabled={code().length < 6 || email().length === 0} onClick={activate}>
          Aktivieren
        </Button>
        <Button onClick={() => navigate("/")}>Abbrechen</Button>
      </div>
      <Alert show={errorMessage().length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage()}
      </Alert>
    </section>
  );
}
