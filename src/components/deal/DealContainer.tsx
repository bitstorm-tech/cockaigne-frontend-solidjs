import { JSXElement, mergeProps, Show } from "solid-js";
import { A } from "solid-start";
import CategoryIcon from "~/components/ui/CategoryIcon";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function DealContainer(props: {
  deal: ActiveDeal;
  showDetails?: boolean;
  showCompanyName?: boolean;
  onClick?: () => void;
  children: JSXElement;
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
          <button class="mr-3" onClick={props.onClick} style="color: {category.color}">
            <slot name="right-action" />
          </button>
        </div>
        <Show when={props.showDetails}>{props.children}</Show>
      </div>
    </div>
  );
}
