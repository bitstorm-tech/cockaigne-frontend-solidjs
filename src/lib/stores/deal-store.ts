import { createSignal } from "solid-js";
import dealService from "~/lib/supabase/deal-service";
import locationService from "~/lib/supabase/location-service";
import { ActiveDeal } from "~/lib/supabase/public-types";

export const [deals, setDeals] = createSignal<ActiveDeal[]>([]);
export const [hotDeals, setHotDeals] = createSignal<ActiveDeal[]>([]);

export async function loadActiveAndHotDeals() {
  const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
  const [loadedDeals, loadedHotDeals] = await Promise.all([dealService.getDealsByFilter(filter), dealService.getHotDeals()]);
  loadedHotDeals.forEach((d) => (d.isHot = true));
  setHotDeals(loadedHotDeals);
  setDeals(loadedDeals);
  markDealsAsHot();
}

export async function toggleHotDeal(dealId: string) {
  const hotDeal = await dealService.toggleHotDeal(dealId);

  if (hotDeal) {
    hotDeal.isHot = true;
    setHotDeals([...hotDeals(), hotDeal]);
  } else {
    setHotDeals(hotDeals().filter((d) => d.id !== dealId));
  }

  markDealsAsHot();
}

function markDealsAsHot() {
  const markedDeals = deals().map((d) => {
    return { ...d, isHot: hotDeals().some((hot) => hot.id === d.id) };
  });
  setDeals(markedDeals);
}
