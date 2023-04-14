import { For, JSXElement } from "solid-js";
import Image from "~/components/image/Image";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function DealDetailsContainer(props: { children: JSXElement; deal: ActiveDeal }) {
  return (
    <div class="flex flex-col justify-between bg-[#323e42] p-2">
      {props.deal.description}
      <div class="grid grid-cols-3 gap-1 py-2">
        <For each={props.deal.imageUrls || []}>{(imageUrl) => <Image url={imageUrl} smallHeight={true} />}</For>
      </div>
      {props.children}
    </div>
  );
}
