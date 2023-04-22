import { createSignal, Suspense } from "solid-js";
import { useNavigate } from "solid-start";
import DealerSettings from "~/components/settings/DealerSettings";
import UserSettings from "~/components/settings/UserSettings";
import Button from "~/components/ui/Button";
import { setAccount } from "~/lib/stores/account-store";
import sessionStore from "~/lib/stores/session-store";
import storageService from "~/lib/supabase/storage-service";

export default function Settings() {
  const navigate = useNavigate();
  const [saving, setSaving] = createSignal(false);
  const [newProfileImage, setNewProfileImage] = createSignal<File>();
  const [errorMessage, setErrorMessage] = createSignal<string>();

  async function save() {
    await saveProfileImage();
  }

  async function saveProfileImage() {
    if (!newProfileImage()) {
      return;
    }

    const profileImageUrl = await storageService.saveProfileImage(newProfileImage()!);

    if (profileImageUrl) {
      setAccount("profileImageUrl", profileImageUrl);
      setNewProfileImage(undefined);
      return;
    }

    setErrorMessage("Kann Profilbild gerade nicht speichern");
  }

  return (
    <section class="flex flex-col gap-4 p-4">
      <Suspense>
        {sessionStore.isDealer ? (
          <DealerSettings onProfileImageSelected={setNewProfileImage} />
        ) : (
          <UserSettings onProfileImageSelected={setNewProfileImage} />
        )}
      </Suspense>
      <div class="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving()}>
          Speichern
        </Button>
        <Button onClick={() => navigate("/")}>Abbrechen</Button>
      </div>
    </section>
  );
}
