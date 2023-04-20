import { createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import ImagePicker from "~/components/ui/ImagePicker";
import Input from "~/components/ui/Input";
import { account, setAccount } from "~/lib/stores/account-store";

export default function UserSettings(props: { onProfileImageSelected: (image: File) => void }) {
  const [tabIndex, setTabIndex] = createSignal(0);

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
          <Input label="Benutzername" value={account.username} onChange={(value) => setAccount("username", value)} />
          <Input label="E-Mail" value={account.email} disabled />
          <Button onClick={changePassword}>Passwort ändern</Button>
          <Button onClick={notify}>Notification Test</Button>
        </>
      ) : (
        <ImagePicker
          imagePreview={account.profileImageUrl}
          onImageSelected={props.onProfileImageSelected}
          buttonText="Profilbild ändern"
        />
      )}
    </>
  );
}
