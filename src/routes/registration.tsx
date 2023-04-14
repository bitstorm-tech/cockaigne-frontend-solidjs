import { createEffect, createSignal, Show } from "solid-js";
import { useNavigate } from "solid-start";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import Checkbox from "~/components/ui/Checkbox";
import Input from "~/components/ui/Input";
import accountService from "~/lib/supabase/account-service";

export default function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [disabled, setDisabled] = createSignal(true);
  const [isDealer, setIsDealer] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [street, setStreet] = createSignal("");
  const [houseNumber, setHouseNumber] = createSignal("");
  const [city, setCity] = createSignal("");
  const [zip, setZip] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [taxId, setTaxId] = createSignal("");
  const [age, setAge] = createSignal("111");
  const [gender, setGender] = createSignal("111");
  const [defaultCategory, setDefaultCategory] = createSignal(0);

  createEffect(() => {
    const disabled =
      email().length === 0 ||
      password().length === 0 ||
      username().length === 0 ||
      (isDealer() && street().length === 0) ||
      (isDealer() && houseNumber().length === 0) ||
      (isDealer() && city().length === 0) ||
      (isDealer() && zip().length === 0) ||
      (isDealer() && phone().length === 0) ||
      (!isDealer() && age().length === 0) ||
      (!isDealer() && gender().length === 0);
    setDisabled(disabled);
  });

  async function register() {
    setLoading(true);

    const error = await accountService.register({
      email: email(),
      password: password(),
      isDealer: isDealer(),
      defaultCategory: defaultCategory(),
      street: street(),
      houseNumber: houseNumber(),
      city: city(),
      zip: zip(),
      phone: phone(),
      username: username(),
      age: age(),
      gender: gender(),
      taxId: taxId()
    });

    if (error) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    navigate(`/activate/${email}`);
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
        {/*<CategorySelect label="Branche" bind:value={defaultCategory} />*/}
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
        {/*<ButtonGroup label="Geschlecht" options={genderOptions} bind:value={gender} />*/}
        {/*<ButtonGroup label="Alter" options={ageOptions} bind:value={age} />*/}
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
