import { createResource, createSignal, onMount, Show, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-start";
import DealerSettings from "~/components/settings/DealerSettings";
import UserSettings from "~/components/settings/UserSettings";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import sessionStore from "~/lib/stores/session-store";
import { EMPTY_ACCOUNT, getAccount, updateAccount } from "~/lib/supabase/account-service";
import { Account } from "~/lib/supabase/public-types";
import { getProfileImage, saveProfileImage } from "~/lib/supabase/storage-service";

export const [accountCopy, setAccountCopy] = createStore<Account>(EMPTY_ACCOUNT);
export const [newProfileImage, setNewProfileImage] = createSignal<File>();

export default function Settings() {
  const navigate = useNavigate();
  let account: Account | undefined;
  const [profileImageUrl] = createResource(() => getProfileImage(), { initialValue: "" });
  const [saving, setSaving] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  onMount(async () => {
    account = await getAccount();
    if (account) {
      setAccountCopy(account);
    }
  });

  async function save() {
    await saveImage();
    const error = await updateAccount(accountCopy!);

    if (error) {
      setErrorMessage(error);
      return;
    }
  }

  async function saveImage() {
    if (!newProfileImage()) {
      return;
    }

    const profileImageUrl = await saveProfileImage(newProfileImage()!);

    if (profileImageUrl) {
      setNewProfileImage(undefined);
      return;
    }

    setErrorMessage("Kann Profilbild gerade nicht speichern");
  }

  function confirmError() {
    setErrorMessage("");
    setAccountCopy(account || EMPTY_ACCOUNT);
  }

  return (
    <section class="flex flex-col gap-4 p-4">
      <Suspense>
        <Show when={sessionStore.isDealer} fallback={<UserSettings />}>
          <DealerSettings />
        </Show>
      </Suspense>
      <div class="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving()}>
          Speichern
        </Button>
        <Button onClick={() => navigate("/")}>Abbrechen</Button>
      </div>
      <Alert warning show={errorMessage().length > 0} onConfirm={confirmError}>
        {errorMessage()}
      </Alert>
    </section>
  );
}
