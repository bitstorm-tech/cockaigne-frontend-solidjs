import { JSXElement, mergeProps, Show } from "solid-js";
import { A } from "solid-start";
import CategoryIcon from "~/components/ui/CategoryIcon";
import type { FutureActivePastDeal } from "~/lib/supabase/public-types";

function ignoreClick(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();
}

export default function DealContainer(props: {
  deal: FutureActivePastDeal;
  showDetails?: boolean;
  showCompanyName?: boolean;
  onClick?: () => void;
  children: JSXElement;
  rightAction?: JSXElement;
}) {
  props = mergeProps({ showDetails: false, showCompanyName: true }, props);

  return (
    <div class="flex items-center">
      <div class="flex grow flex-col">
        <Show when={props.showCompanyName}>
          <div class="flex justify-between bg-[#232b2e] px-2 py-0.5">
            <A href={`/dealer/${props.deal.dealer_id}`} class="flex items-center text-[#b2b2b2]">
              {props.deal.username}
            </A>
            <A href={`/dealer/${props.deal.dealer_id}`} class="text-[#617780]">
              {">>"}
            </A>
          </div>
        </Show>
        <div class="flex items-center justify-between bg-[#2c363a]" onClick={props.onClick}>
          <div class="flex items-center gap-2">
            <CategoryIcon categoryId={props.deal.category_id || 0} />
            <div class="text-[#fff4eb]">{props.deal.title}</div>
          </div>
          <div onClick={ignoreClick} class="mr-3">
            {props.rightAction}
          </div>
        </div>
        <Show when={props.showDetails}>{props.children}</Show>
      </div>
    </div>
  );
}
