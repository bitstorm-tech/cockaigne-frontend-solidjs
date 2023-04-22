import { createSignal, For, Suspense } from "solid-js";
import DealListContainer from "~/components/deal/DealListContainer";
import DealerDeal from "~/components/dealer/DealerDeal";
import { FutureActivePastDeal } from "~/lib/supabase/public-types";

export default function DealerDealList(props: { deals: FutureActivePastDeal[]; showRightActions?: boolean }) {
  const [openDealIndex, setOpenDealIndex] = createSignal(-1);

  return (
    <DealListContainer>
      <Suspense>
        <For each={props.deals}>
          {(deal, index) => (
            <DealerDeal
              deal={deal}
              showDetails={openDealIndex() === index()}
              onClick={() => setOpenDealIndex(openDealIndex() === index() ? -1 : index())}
              showRightAction={props.showRightActions}
            />
          )}
        </For>
      </Suspense>
    </DealListContainer>
  );
}
