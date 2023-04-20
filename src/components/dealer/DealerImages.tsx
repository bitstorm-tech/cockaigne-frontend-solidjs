import { useParams } from "@solidjs/router";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import AddImageButton from "~/components/image/AddImageButton";
import DeleteImageModal, { setShowDeleteImageModal } from "~/components/image/DeleteImageModal";
import Image from "~/components/image/Image";
import ImageZoomModal, { setShowImageZoomModal } from "~/components/image/ImageZoomModal";
import EmptyContent from "~/components/ui/EmptyContent";
import LoadingSpinner from "~/components/ui/icons/LoadingSpinner";
import Toast from "~/components/ui/Toast";
import sessionStore from "~/lib/stores/session-store";
import storageService from "~/lib/supabase/storage-service";

export default function DealerImages(props: { companyName: string }) {
  const params = useParams();
  const [toastText, setToastText] = createSignal("");
  const [zoomIndex, setZoomIndex] = createSignal(0);
  const [deleteImageUrl, setDeleteImageUrl] = createSignal("");
  const [images, { mutate }] = createResource(async () => await storageService.getDealerImages(params.id), { initialValue: [] });

  async function saveImage(image: File) {
    setToastText("Speichere Bild ...");
    const imageUrl = await storageService.saveDealerImage(image);

    if (imageUrl) {
      mutate((old) => [...old, imageUrl]);
    }

    setToastText("");
  }

  async function deleteImage() {
    setToastText("Lösche Bild ...");
    const filename = deleteImageUrl().split("/").pop() || "";
    await storageService.deleteDealerImage(filename);
    mutate((old) => old.filter((url) => url !== deleteImageUrl()));
    setToastText("");
  }

  function openConfirmationModal(imageUrl: string) {
    setDeleteImageUrl(imageUrl);
    setShowDeleteImageModal(true);
  }

  function zoom(index: number) {
    setZoomIndex(index);
    setShowImageZoomModal(true);
  }

  return (
    <Suspense>
      <Show when={images().length === 0}>
        <EmptyContent>Füge ein paar Bilder hinzu und mach deine Seite noch schöner!</EmptyContent>
      </Show>
      <div class="grid grid-cols-3 gap-2">
        <For each={images()}>
          {(image, index) => (
            <Image
              url={image}
              onDelete={() => openConfirmationModal(image)}
              onZoom={() => zoom(index())}
              showDelete={sessionStore.isDealer}
            />
          )}
        </For>
      </div>
      <Show when={sessionStore.isDealer}>
        <div class="sticky bottom-3 flex w-full justify-end pb-9 pr-3">
          <AddImageButton onImageSelect={saveImage} />
        </div>
      </Show>
      <ImageZoomModal imageUrls={images()} index={zoomIndex()} title={props.companyName} />
      <DeleteImageModal url={deleteImageUrl()} onDelete={deleteImage} />
      <Toast show={toastText().length !== 0}>
        <LoadingSpinner /> {toastText()}
      </Toast>
    </Suspense>
  );
}
