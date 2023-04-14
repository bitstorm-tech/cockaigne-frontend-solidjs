import { createSignal, onMount } from "solid-js";
import UserDealList from "~/components/deal/user/UserDealList";
import FireIcon from "~/components/ui/icons/FireIcon";
import HeartIcon from "~/components/ui/icons/HeartIcon";
import StarIcon from "~/components/ui/icons/StarIcon";
import UserHeader from "~/components/user/UserHeader";
import { addressToShortString, getAddress } from "~/lib/geo/address.service";
import { loadAccountStore, profileImageUrl, username } from "~/lib/stores/account-store";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import dealService from "~/lib/supabase/deal-service";
import locationService from "~/lib/supabase/location-service";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function User() {
  const [tabIndex, setTabIndex] = createSignal(0);
  const [deals, setDeals] = createSignal<ActiveDeal[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [address, setAddress] = createSignal([""]);

  onMount(async () => {
    setCurrentPage("home");
    setLoading(true);
    const location = await locationService.getLocation();
    const longAddress = await getAddress(location);
    setAddress(addressToShortString(longAddress));
    loadAccountStore().then();
    const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
    const deals = await dealService.getDealsByFilter(filter);
    setDeals(deals);
    setLoading(false);
  });

  return (
    <>
      <UserHeader username={username()} address={address()} imageUrl={profileImageUrl()} deals={1} favoriteDealers={2} hotDeals={3} />
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
      <div class="h-full overflow-auto">
        {tabIndex() === 0 && <UserDealList deals={deals()} loading={loading()} />}
        {tabIndex() === 1 && <div>tab2</div>}
        {tabIndex() === 2 && <div>tab3</div>}
      </div>
    </>
  );
}
