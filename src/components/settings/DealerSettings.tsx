import { createResource, createSignal, Show } from "solid-js";
import AddressSettings from "~/components/settings/AddressSettings";
import CategorySelect from "~/components/ui/CategorySelect";
import ImagePicker from "~/components/ui/ImagePicker";
import Input from "~/components/ui/Input";
import { getProfileImage } from "~/lib/supabase/storage-service";
import { accountCopy, setAccountCopy, setNewProfileImage } from "~/routes/settings";

export default function DealerSettings() {
  const [tabIndex, setTabIndex] = createSignal(0);
  const [profileImageUrl] = createResource(() => getProfileImage({ isDealer: true }), { initialValue: "" });

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
          <Input label="Firmenname" value={accountCopy.username} onChange={(value) => setAccountCopy("username", value)} />
          <Input label="E-Mail" value={accountCopy.email} disabled />
          <Input
            label="Telefonnummer"
            type="tel"
            value={accountCopy.phone}
            onChange={(value) => setAccountCopy("phone", value)}
          />
          <Input label="Umsatzsteuer ID" value={accountCopy.tax_id} onChange={(value) => setAccountCopy("tax_id", value)} />
          <CategorySelect label="Branche" onSelect={(value) => setAccountCopy("default_category", value)} />
        </div>
      </Show>
      <Show when={tabIndex() === 1}>
        <AddressSettings />
      </Show>
      <Show when={tabIndex() === 2}>
        <ImagePicker imagePreview={profileImageUrl()} onImageSelected={setNewProfileImage} buttonText="Profilbild ändern" />
      </Show>
    </>
  );
}
