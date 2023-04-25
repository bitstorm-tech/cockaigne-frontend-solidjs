import { createSignal, For, JSXElement, Show, Suspense } from "solid-js";
import DealListContainer from "~/components/deal/DealListContainer";
import EmptyContent from "~/components/ui/EmptyContent";
import LoadingSpinner from "~/components/ui/icons/LoadingSpinner";
import UserDeal from "~/components/user/UserDeal";
import { ActiveDeal } from "~/lib/supabase/public-types";

const loading = (
  <EmptyContent>
    <LoadingSpinner size={3} />
    <span>Mal sehen welche Deals es hier so gibt ...</span>
  </EmptyContent>
);

export default function UserDealList(props: { deals: ActiveDeal[]; emptyContent: JSXElement }) {
  const [openDetailsIndex, setOpenDetailsIndex] = createSignal(-1);

  return (
    <DealListContainer>
      <Suspense fallback={loading}>
        <Show when={props.deals?.length === 0}>{props.emptyContent}</Show>
        <For each={props.deals}>
          {(deal, i) => (
            <UserDeal
              deal={deal}
              onClick={() => setOpenDetailsIndex(openDetailsIndex() === i() ? -1 : i())}
              showDetails={openDetailsIndex() === i()}
            />
          )}
        </For>
      </Suspense>
    </DealListContainer>
  );
}
