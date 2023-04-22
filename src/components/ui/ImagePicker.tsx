import { createSignal, Show } from "solid-js";
import Button from "~/components/ui/Button";

export default function ImagePicker(props: {
  buttonText?: string;
  onImageSelected: (image: File, previewImageUrl: string) => void;
  imagePreview?: string;
  hidePreview?: boolean;
  disabled?: boolean;
}) {
  const [imagePreview, setImagePreview] = createSignal(props.imagePreview);
  let fileInput!: HTMLInputElement;
  let file: File | undefined;

  // @ts-ignore
  function pictureSelected(event) {
    file = event.target.files[0] as File;

    if (!file) {
      return;
    }

    const URL = window.URL || window.webkitURL;
    setImagePreview(URL.createObjectURL(file));
    props.onImageSelected(file, imagePreview()!);
  }

  return (
    <>
      <Button onClick={() => fileInput.click()} disabled={props.disabled}>
        {props.buttonText || "Bild auswählen"}
      </Button>
      <input ref={fileInput} onChange={pictureSelected} type="file" hidden />
      <Show when={imagePreview() && !props.hidePreview}>
        <img loading="lazy" src={imagePreview()} alt="Gewähltes Bild" class="w-screen self-center md:w-2/3" />
      </Show>
    </>
  );
}
