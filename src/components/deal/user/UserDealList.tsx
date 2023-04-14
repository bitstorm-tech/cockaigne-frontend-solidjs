import { createSignal, For, mergeProps, Show } from "solid-js";
import { Link } from "solid-start";
import DealListContainer from "~/components/deal/DealListContainer";
import UserDeal from "~/components/deal/user/UserDeal";
import EmptyContent from "~/components/ui/EmptyContent";
import LoadingSpinner from "~/components/ui/icons/LoadingSpinner";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function UserDealList(props: { deals: ActiveDeal[]; loading?: boolean }) {
  props = mergeProps({ loading: false }, props);

  const [openDetailsIndex, setOpenDetailsIndex] = createSignal(-1);

  return (
    <DealListContainer>
      <Show when={props.loading}>
        <EmptyContent>
          <LoadingSpinner size={4} />
          <span>Mal sehen welche Deals es hier so gibt ...</span>
        </EmptyContent>
      </Show>
      <Show when={props.deals.length === 0 && !props.loading}>
        <EmptyContent>
          <p>Aktuell gibt es leider keine Deals in deiner Nähe :(</p>
          <p>
            <Link href="/map?showFilter=true">
              <u>Filter anpassen</u>
            </Link>
            oder
            <Link href="/map">
              <u>Standort ändern</u>
            </Link>
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
    </DealListContainer>
  );
}
