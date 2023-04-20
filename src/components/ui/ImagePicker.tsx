import { createSignal, mergeProps, Show } from "solid-js";
import Button from "~/components/ui/Button";

const [selectedImage, setSelectedImage] = createSignal<File>();
const [imagePreview, setImagePreview] = createSignal("");

export default function ImagePicker(props: {
  buttonText?: string;
  onImageSelected: (image: File) => void;
  imagePreview?: string;
}) {
  props = mergeProps({ buttonText: "Bild auswählen" }, props);
  const [imagePreview, setImagePreview] = createSignal(props.imagePreview);
  let fileInput!: HTMLInputElement;
  let file: File | undefined;

  function pictureSelected(event) {
    file = event.target.files[0] as File;

    if (!file) {
      return;
    }

    const URL = window.URL || window.webkitURL;
    setImagePreview(URL.createObjectURL(file));
    props.onImageSelected(file);
  }

  return (
    <>
      <Button onClick={() => fileInput.click()}>{props.buttonText}</Button>
      <input ref={fileInput} onChange={pictureSelected} type="file" hidden />
      <Show when={imagePreview()}>
        <img loading="lazy" src={imagePreview()} alt="Gewähltes Bild" class="w-screen self-center md:w-2/3" />
      </Show>
    </>
  );
}
