import type { Deal } from "$lib/supabase/public-types";

export type DealState = "past" | "future" | "active";

export function getDealState(deal: Deal): DealState {
  const start = new Date(deal.start).getTime();
  const end = start + +deal.duration * 60 * 60 * 1000;
  const now = new Date().getTime();

  if (now < start) {
    return "future";
  }

  if (now > end) {
    return "past";
  }

  return "active";
}

export interface SortedDeals {
  past: Deal[];
  future: Deal[];
  active: Deal[];
}

export function sortDealsByState(deals: Deal[]): SortedDeals {
  const sortedDeals: SortedDeals = {
    past: [],
    future: [],
    active: []
  };

  for (const deal of deals) {
    const state = getDealState(deal);
    sortedDeals[state].push(deal);
  }

  return sortedDeals;
}
