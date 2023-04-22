import { createSignal, For, JSXElement } from "solid-js";
import Image from "~/components/image/Image";
import ImageZoomModal, { setShowImageZoomModal } from "~/components/image/ImageZoomModal";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function DealDetailsContainer(props: { children: JSXElement; deal: ActiveDeal }) {
  const [imageIndex, setImageIndex] = createSignal(0);

  function openImageZoomModal(index: number) {
    setImageIndex(index);
    setShowImageZoomModal(true);
  }

  return (
    <div class="flex flex-col justify-between bg-[#323e42] p-2">
      {props.deal.description}
      <div class="grid grid-cols-3 gap-1 py-2">
        <For each={props.deal.imageUrls || []}>
          {(imageUrl, index) => <Image url={imageUrl} smallHeight={true} onZoom={() => openImageZoomModal(index())} />}
        </For>
      </div>
      {props.children}
      <ImageZoomModal title={props.deal.title || ""} imageUrls={props.deal.imageUrls || []} index={imageIndex()} />
    </div>
  );
}
