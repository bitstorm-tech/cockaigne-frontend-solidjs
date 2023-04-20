import Input from "~/components/ui/Input";
import { account } from "~/lib/stores/account-store";

export default function AddressSettings() {
  return (
    <>
      <div class="grid grid-cols-3 gap-3">
        <div class="col-span-2">
          <Input label="Straße" value={account.street} onChange={(value) => (account.street = value)} />
        </div>
        <Input label="Hausnummer" value={account.house_number} onChange={(value) => (account.house_number = value)} />
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div class="col-span-2">
          <Input label="Ort" value={account.city} onChange={(value) => (account.city = value)} />
        </div>
        <Input label="PLZ" type="number" value={account.zip?.toString()} onChange={(value) => (account.zip = +value)} />
      </div>
    </>
  );
}
