import { createResource, createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import ImagePicker from "~/components/ui/ImagePicker";
import Input from "~/components/ui/Input";
import { getProfileImage } from "~/lib/supabase/storage-service";
import { accountCopy, setAccountCopy, setNewProfileImage } from "~/routes/settings";

export default function UserSettings() {
  const [tabIndex, setTabIndex] = createSignal(0);
  const [profileImageUrl] = createResource(() => getProfileImage(), { initialValue: "" });

  async function changePassword() {}

  async function notify() {
    await Notification.requestPermission();
    new Notification("Hallo Cockaigne User!");
  }

  return (
    <>
      <div class="tabs">
        <button onClick={() => setTabIndex(0)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 0}>
          Allgemein
        </button>
        <button onClick={() => setTabIndex(1)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 1}>
          Profilbild
        </button>
      </div>
      {tabIndex() === 0 ? (
        <>
          <Input label="Benutzername" value={accountCopy.username} onChange={(value) => setAccountCopy("username", value)} />
          <Input label="E-Mail" value={accountCopy.email} disabled />
          <Button onClick={changePassword}>Passwort ändern</Button>
          <Button onClick={notify}>Notification Test</Button>
        </>
      ) : (
        <ImagePicker imagePreview={profileImageUrl()} onImageSelected={setNewProfileImage} buttonText="Profilbild ändern" />
      )}
    </>
  );
}
