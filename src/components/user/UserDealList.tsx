import { createSignal, For, Show, Suspense } from "solid-js";
import { A } from "solid-start";
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

export default function UserDealList(props: { deals: ActiveDeal[] }) {
  const [openDetailsIndex, setOpenDetailsIndex] = createSignal(-1);

  return (
    <DealListContainer>
      <Suspense fallback={loading}>
        <Show when={props.deals?.length === 0}>
          <EmptyContent>
            <p>Aktuell gibt es leider keine Deals in deiner Nähe :(</p>
            <p>
              <A href="/map?showFilter=true">
                <u>Filter anpassen</u>
              </A>
              {" oder "}
              <A href="/map">
                <u>Standort ändern</u>
              </A>
              !
            </p>
          </EmptyContent>
        </Show>
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
