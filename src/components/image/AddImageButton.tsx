import Button from "~/components/ui/Button";
import PlusIcon from "~/components/ui/icons/PlusIcon";

export default function AddImageButton(props: { onImageSelect: (image: File) => void }) {
  let fileInput!: HTMLInputElement;

  return (
    <>
      <Button circle onClick={() => fileInput.click()}>
        <PlusIcon />
      </Button>
      <input ref={fileInput} onChange={(event) => props.onImageSelect(event.target.files![0])} type="file" hidden />
    </>
  );
}
