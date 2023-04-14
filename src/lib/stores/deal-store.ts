import { createStore } from "solid-js/store";
import dealService from "~/lib/supabase/deal-service";
import locationService from "~/lib/supabase/location-service";
import { ActiveDeal } from "~/lib/supabase/public-types";

export const [dealStore, setDealStore] = createStore<ActiveDeal[]>([]);

export async function loadActiveDeals() {
  const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
  const deals = await dealService.getDealsByFilter(filter);
  setDealStore(deals);
}
