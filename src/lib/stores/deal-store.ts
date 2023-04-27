import { createSignal } from "solid-js";
import dealService from "~/lib/supabase/deal-service";
import locationService from "~/lib/supabase/location-service";
import { ActiveDeal, Like } from "~/lib/supabase/public-types";

export const [deals, setDeals] = createSignal<ActiveDeal[]>([]);
export const [hotDeals, setHotDeals] = createSignal<ActiveDeal[]>([]);
export const [likes, setLikes] = createSignal<Like[]>([]);

export async function loadActiveAndHotDeals() {
  const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
  const [loadedDeals, loadedHotDeals, loadedLikes] = await Promise.all([
    dealService.getDealsByFilter(filter),
    dealService.getHotDeals(),
    dealService.getLikes()
  ]);
  loadedHotDeals.forEach((d) => (d.isHot = true));

  setHotDeals(loadedHotDeals);
  setDeals(loadedDeals);
  setLikes(loadedLikes);

  markDealsAsHotAndLiked();
}

export async function toggleHotDeal(dealId: string) {
  const hotDeal = await dealService.toggleHotDeal(dealId);

  if (hotDeal) {
    hotDeal.isHot = true;
    setHotDeals([...hotDeals(), hotDeal]);
  } else {
    setHotDeals(hotDeals().filter((d) => d.id !== dealId));
  }

  markDealsAsHotAndLiked();
}

export async function toggleLike(dealId: string) {
  await dealService.toggleLike(dealId);

  const deal = deals().find((d) => d.id === dealId);
  if (deal) {
    deal.likes = likes().some((l) => l.deal_id === dealId) ? --deal.likes : ++deal.likes;
  }

  markDealsAsHotAndLiked();
}

function markDealsAsHotAndLiked() {
  const markedDeals = deals().map((d) => {
    return {
      ...d,
      isHot: hotDeals().some((hot) => hot.id === d.id),
      isLiked: likes().some((like) => like.deal_id === d.id)
    };
  });
  setDeals(markedDeals);

  const markedHotDeals = hotDeals().map((d) => {
    return { ...d, isLiked: likes().some((like) => like.deal_id === d.id) };
  });
  setHotDeals(markedHotDeals);
}
