import { createSignal, onMount, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-start";
import DealerSettings from "~/components/settings/DealerSettings";
import UserSettings from "~/components/settings/UserSettings";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import { account, setAccount, setProfileImageUrl } from "~/lib/stores/account-store";
import sessionStore from "~/lib/stores/session-store";
import accountService from "~/lib/supabase/account-service";
import storageService from "~/lib/supabase/storage-service";

export const [accountCopy, setAccountCopy] = createStore({ ...account });
export const [newProfileImage, setNewProfileImage] = createSignal<File>();

export default function Settings() {
  const navigate = useNavigate();
  const [saving, setSaving] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  onMount(() => setAccountCopy({ ...account }));

  async function save() {
    await saveProfileImage();
    const error = await accountService.updateAccount(accountCopy);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setAccount({ ...accountCopy });
  }

  async function saveProfileImage() {
    if (!newProfileImage()) {
      return;
    }

    const profileImageUrl = await storageService.saveProfileImage(newProfileImage()!);

    if (profileImageUrl) {
      setProfileImageUrl(profileImageUrl);
      setNewProfileImage(undefined);
      return;
    }

    setErrorMessage("Kann Profilbild gerade nicht speichern");
  }

  return (
    <section class="flex flex-col gap-4 p-4">
      <Suspense>{sessionStore.isDealer ? <DealerSettings /> : <UserSettings />}</Suspense>
      <div class="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving()}>
          Speichern
        </Button>
        <Button onClick={() => navigate("/")}>Abbrechen</Button>
      </div>
      <Alert warning show={errorMessage().length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage()}
      </Alert>
    </section>
  );
}
