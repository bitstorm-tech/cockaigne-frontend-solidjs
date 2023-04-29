import { createSignal, onMount, Show, Suspense } from "solid-js";
import { A } from "solid-start";
import EmptyContent from "~/components/ui/EmptyContent";
import FireIcon from "~/components/ui/icons/FireIcon";
import HeartIcon from "~/components/ui/icons/HeartIcon";
import StarIcon from "~/components/ui/icons/StarIcon";
import UserDealList from "~/components/user/UserDealList";
import UserFavoriteDealerList from "~/components/user/UserFavoriteDealerList";
import UserHeader from "~/components/user/UserHeader";
import UserHotDealList from "~/components/user/UserHotDealList";
import { deals, loadActiveAndHotDeals } from "~/lib/stores/deal-store";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import { rotateByCurrentTime } from "~/lib/supabase/deal-service";

export default function User() {
  const [tabIndex, setTabIndex] = createSignal(0);
  loadActiveAndHotDeals().then();

  onMount(async () => setCurrentPage("home"));

  const sortedDeals = rotateByCurrentTime(deals());

  const emptyContent = (
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
  );

  return (
    <>
      <UserHeader />
      <div class="tabs mb-1 mt-6 flex max-h-8">
        <button onClick={() => setTabIndex(0)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 0 }}>
          <StarIcon outline={tabIndex() !== 0} />
        </button>
        <button onClick={() => setTabIndex(1)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 1 }}>
          <FireIcon outline={tabIndex() !== 1} />
        </button>
        <button onClick={() => setTabIndex(2)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 2 }}>
          <HeartIcon outline={tabIndex() !== 2} />
        </button>
      </div>
      <Suspense>
        <Show when={tabIndex() === 0}>
          <UserDealList deals={sortedDeals} emptyContent={emptyContent} />
        </Show>
        <Show when={tabIndex() === 1}>
          <UserHotDealList />
        </Show>
        <Show when={tabIndex() === 2}>
          <UserFavoriteDealerList />
        </Show>
      </Suspense>
    </>
  );
}
