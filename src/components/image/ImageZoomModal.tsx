import { createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import Modal from "~/components/ui/Modal";

export const [showImageZoomModal, setShowImageZoomModal] = createSignal(false);

export default function ImageZoomModal(props: { title: string; imageUrls: string[]; index: number }) {
  const [index, setIndex] = createSignal(0);

  function next() {
    index() === props.imageUrls.length - 1 ? setIndex(0) : setIndex(index() + 1);
  }

  function previous() {
    index() === 0 ? setIndex(props.imageUrls.length - 1) : setIndex(index() - 1);
  }

  return (
    <Modal show={showImageZoomModal()} onClose={() => setShowImageZoomModal(false)} onShow={() => setIndex(props.index)}>
      <div>Index: {index()}</div>
      <div class="flex max-h-[75vh] flex-col gap-3">
        <div class="overflow-auto">
          <img loading="lazy" src={props.imageUrls[index()]} alt="Dealer shop impression or deal images" />
        </div>
        <div class="flex items-center text-[#fff4eb]">
          <Button onClick={previous} circle>
            &lt;
          </Button>
          <div class="flex grow flex-col text-center">
            <p>{props.title}</p>
            <p class="text-xs">
              ({index() + 1}/{props.imageUrls.length})
            </p>
          </div>
          <Button onClick={next} circle>
            &gt;
          </Button>
        </div>
      </div>
    </Modal>
  );
}
