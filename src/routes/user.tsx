import { createEffect, createResource, createSignal, onMount } from "solid-js";
import FireIcon from "~/components/ui/icons/FireIcon";
import HeartIcon from "~/components/ui/icons/HeartIcon";
import StarIcon from "~/components/ui/icons/StarIcon";
import UserDealList from "~/components/user/UserDealList";
import UserFavoriteDealerList from "~/components/user/UserFavoriteDealerList";
import UserHeader from "~/components/user/UserHeader";
import UserHotDealList from "~/components/user/UserHotDealList";
import { account } from "~/lib/stores/account-store";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import dealService from "~/lib/supabase/deal-service";
import locationService from "~/lib/supabase/location-service";

async function fetchDeals() {
  const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
  return await dealService.getDealsByFilter(filter);
}

export default function User() {
  onMount(() => setCurrentPage("home"));
  const [tabIndex, setTabIndex] = createSignal(0);

  const [deals] = createResource(fetchDeals);

  createEffect(() => console.log("hohohaha", account));

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
      {tabIndex() === 0 && <UserDealList deals={deals()!} />}
      {tabIndex() === 1 && <UserHotDealList />}
      {tabIndex() === 2 && <UserFavoriteDealerList />}
    </>
  );
}
