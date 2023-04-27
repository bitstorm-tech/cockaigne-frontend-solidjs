import { createEffect, createSignal, Show } from "solid-js";
import { useNavigate } from "solid-start";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import ButtonGroup from "~/components/ui/ButtonGroup";
import CategorySelect from "~/components/ui/CategorySelect";
import Checkbox from "~/components/ui/Checkbox";
import Input from "~/components/ui/Input";
import accountService from "~/lib/supabase/account-service";

const genderOptions = {
  m: "Mann",
  f: "Frau"
};

const ageOptions = {
  1: "Bis 16",
  2: "17-24",
  3: "25-36",
  4: "37-45",
  5: "46+"
};

export default function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [disabled, setDisabled] = createSignal(true);
  const [isDealer, setIsDealer] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  const [email, setEmail] = createSignal<string>();
  const [username, setUsername] = createSignal<string>();
  const [password, setPassword] = createSignal<string>();
  const [street, setStreet] = createSignal<string>();
  const [houseNumber, setHouseNumber] = createSignal<string>();
  const [city, setCity] = createSignal<string>();
  const [zip, setZip] = createSignal<number>();
  const [phone, setPhone] = createSignal<string>();
  const [taxId, setTaxId] = createSignal<string>();
  const [age, setAge] = createSignal<number>();
  const [gender, setGender] = createSignal<string>();
  const [defaultCategory, setDefaultCategory] = createSignal<number>();

  createEffect(() => {
    const disabled =
      !email() ||
      !password() ||
      !username() ||
      (isDealer() && !street()) ||
      (isDealer() && !houseNumber()) ||
      (isDealer() && !city()) ||
      (isDealer() && !zip()) ||
      (isDealer() && !phone()) ||
      (!isDealer() && !age()) ||
      (!isDealer() && !gender());
    setDisabled(disabled);
  });

  async function register() {
    setLoading(true);

    const error = await accountService.register({
      email: email()!,
      password: password()!,
      is_dealer: isDealer(),
      default_category: defaultCategory(),
      street: street(),
      house_number: houseNumber(),
      city: city(),
      zip: zip(),
      phone: phone(),
      username: username()!,
      age: age(),
      gender: gender(),
      tax_id: taxId()
    });

    if (error) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    navigate(`/activate/${email()}`);
  }

  return (
    <section class="mx-auto mt-10 flex h-full w-5/6 flex-col gap-3 lg:w-1/3">
      <h1>Registrieren</h1>
      <Checkbox label="Ich bin ein Händler" onChange={setIsDealer} />
      <Input label="E-Mail" type="email" onChange={setEmail} />
      <Show when={!isDealer()}>
        <Input label="Benutzername" type="text" onChange={setUsername} />
      </Show>
      <Input label="Passwort" type="password" onChange={setPassword} />
      <Show when={isDealer()}>
        <Input label="Firmenname" type="text" onChange={setUsername} />
        <CategorySelect label="Branche" onSelect={setDefaultCategory} />
        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2">
            <Input label="Straße" type="text" onChange={setStreet} />
          </div>
          <Input label="Hausnummer" type="text" onChange={setHouseNumber} />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2">
            <Input label="Ort" type="text" onChange={setCity} />
          </div>
          <Input label="PLZ" type="number" onChange={setZip} />
        </div>
        <Input label="Telefon" type="tel" onChange={setPhone} />
        <Input label="Umsatzsteuer ID" type="text" onChange={setTaxId} />
      </Show>
      <Show when={!isDealer()}>
        <ButtonGroup label="Geschlecht" options={genderOptions} onChange={setGender} />
        <ButtonGroup label="Alter" options={ageOptions} onChange={setAge} />
      </Show>

      <div class="grid grid-cols-2 gap-4 pt-6">
        <Button onClick={register} loading={loading()} disabled={disabled()}>
          Registrieren
        </Button>
        <Button onClick={() => navigate("/")}>Abbrechen</Button>
      </div>
      <Alert show={errorMessage().length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage()}
      </Alert>
    </section>
  );
}
