import { createSignal, Show } from "solid-js";
import AddressSettings from "~/components/settings/AddressSettings";
import CategorySelect from "~/components/ui/CategorySelect";
import ImagePicker from "~/components/ui/ImagePicker";
import Input from "~/components/ui/Input";
import { account } from "~/lib/stores/account-store";

export default function DealerSettings(props: { onProfileImageSelected: (image: File) => void }) {
  const [tabIndex, setTabIndex] = createSignal(0);

  return (
    <>
      <div class="tabs">
        <button onClick={() => setTabIndex(0)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 0}>
          Allgemein
        </button>
        <button onClick={() => setTabIndex(1)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 1}>
          Adresse
        </button>
        <button onClick={() => setTabIndex(2)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 2}>
          Profilbild
        </button>
      </div>
      <Show when={tabIndex() === 0}>
        <div class="flex flex-col gap-3">
          <Input label="Firmenname" value={account.username} onChange={(value) => (account.username = value)} />
          <Input label="E-Mail" value={account.username} disabled />
          <Input label="Telefonnummer" type="tel" value={account.phone} onChange={(value) => (account.phone = value)} />
          <Input label="Umsatzsteuer ID" value={account.tax_id} onChange={(value) => (account.tax_id = value)} />
          <CategorySelect
            label="Branche"
            value={account.default_category || 1}
            onSelect={(value) => (account.default_category = value)}
          />
        </div>
      </Show>
      <Show when={tabIndex() === 1}>
        <AddressSettings />
      </Show>
      <Show when={tabIndex() === 2}>
        <ImagePicker
          imagePreview={account.profileImageUrl}
          onImageSelected={props.onProfileImageSelected}
          buttonText="Profilbild ändern"
        />
      </Show>
    </>
  );
}
