import { createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";

export const [showDeleteImageModal, setShowDeleteImageModal] = createSignal(false);

export default function DeleteImageModal(props: { url: string; onDelete: () => void }) {
  function deleteImage() {
    props.onDelete();
    setShowDeleteImageModal(false);
  }

  const buttons = (
    <>
      <Button onClick={deleteImage}>Ja</Button>
      <Button onClick={() => setShowDeleteImageModal(false)}>Nein</Button>
    </>
  );

  return (
    <Modal show={showDeleteImageModal()} onClose={() => setShowDeleteImageModal(false)} buttons={buttons}>
      <div class="flex flex-col gap-3">
        <img loading="lazy" src={props.url} alt="Dealer Impression to delete" />
        <b class="text-large">Dieses Bild wirklich löschen?</b>
      </div>
    </Modal>
  );
}
