import remove from "lodash/remove";
import { Extent } from "ol/extent";
import { Position } from "~/lib/geo/geo.types";
import authService from "~/lib/supabase/auth-service";
import storageService from "~/lib/supabase/storage-service";
import dateTimeUtils, { getDateTimeAsIsoString } from "~/lib/utils/date-time.utils";
import locationService from "./location-service";
import type {
  ActiveDeal,
  Deal,
  DealUpsert,
  FutureDeal,
  GetActiveDealsWithinExtentFunctionArguments,
  PastDeal
} from "./public-types";
import { supabase } from "./supabase-client";

export interface DealFilter {
  location?: Position;
  radius?: number;
  extent?: Extent;
  categoryIds?: number[];
  limit?: number;
  orderBy?: string;
}

async function getDeal(id: string): Promise<Deal | undefined> {
  const { data, error } = await supabase.from("deals").select().eq("id", id).single();

  if (error) {
    console.error("Can't get deal:", error);
    return;
  }

  const deal: Deal = data;

  if (!deal.imageUrls) {
    deal.imageUrls = [];
  }

  return deal;
}

async function getActiveDealsByDealer(dealerIds?: string | string[]): Promise<ActiveDeal[]> {
  const ids = dealerIds ? (Array.isArray(dealerIds) ? dealerIds : [dealerIds]) : [await authService.getUserId()];
  const { data, error } = await supabase.from("active_deals_view").select().in("dealer_id", ids);

  if (error) {
    console.error("Can't get active deals:", error);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

async function getPastDealsByDealer(): Promise<PastDeal[]> {
  const dealerId = await authService.getUserId();

  if (!dealerId) return [];

  const { data, error } = await supabase.from("past_deals_view").select().eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't get past deals:", error);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

async function getFutureDealsByDealer(): Promise<FutureDeal[]> {
  const dealerId = await authService.getUserId();

  if (!dealerId) return [];

  const { data, error } = await supabase.from("future_deals_view").select().eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't get future deals:", error);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

async function getTemplatesByDealer(): Promise<Deal[]> {
  const dealerId = await authService.getUserId();

  const { data, error } = await supabase.from("deals").select().eq("dealer_id", dealerId).eq("template", true);

  if (error) {
    console.log("Can't get templates:", error);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

async function upsertDeal(deal: DealUpsert, alsoCreateTemplate = false): Promise<string | undefined> {
  const dealerId = await authService.getUserId();

  if (!dealerId) return;

  const _deal = deal;
  delete _deal.imageUrls;

  const resultUpsertDeal = await supabase.from("deals").upsert(_deal).select("id").single();

  if (resultUpsertDeal.error) {
    console.log("Can't upsert deal:", resultUpsertDeal.error);
    return;
  }

  if (!alsoCreateTemplate) {
    return resultUpsertDeal.data.id;
  }

  deal.template = true;
  const resultUpsertTemplate = await supabase.from("deals").insert(deal).select("id").single();

  if (resultUpsertTemplate.error) {
    console.log("Can't insert deal template:", resultUpsertTemplate.error);
    return resultUpsertDeal.data.id;
  }

  return resultUpsertTemplate.data.id;
}

async function deleteDeal(dealId: string): Promise<string | undefined> {
  const dealerId = await authService.getUserId();
  const { error } = await supabase.from("deals").delete().eq("id", dealId).eq("dealer_id", dealerId);

  if (error) {
    console.log("Can't delete deal:", error);
    return error.message;
  }
}

function createExtentFromFilter(filter: DealFilter): GetActiveDealsWithinExtentFunctionArguments | null {
  if (filter.extent) {
    return { p_extent: filter.extent };
  }

  if (filter.radius && filter.location) {
    return {
      p_location: [filter.location.longitude, filter.location.latitude],
      p_radius: filter.radius
    };
  }

  return null;
}

export async function getDealsByFilter(filter: DealFilter): Promise<ActiveDeal[]> {
  const extent = createExtentFromFilter(filter);

  if (!extent) {
    console.log("Can't get deals by filter -> no valid extent");
    return [];
  }

  let query = supabase.rpc("get_active_deals_within_extent", extent);

  if (filter.categoryIds && filter.categoryIds.length > 0) {
    query = query.in("category_id", filter.categoryIds);
  }

  if (filter.limit) {
    query = query.limit(filter.limit);
  }

  query = query.order("start_time");

  const { data, error } = await query;

  if (error) {
    console.error("Can't get deals by filter:", error);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

async function toggleHotDeal(dealId: string): Promise<ActiveDeal | null> {
  const { data } = await supabase.from("hot_deals").select().eq("deal_id", dealId);

  if (data && data.length >= 1) {
    await supabase.from("hot_deals").delete().eq("deal_id", dealId);
    return null;
  }

  const userId = await authService.getUserId();
  if (!userId) {
    console.log("Can't toggle hot deal, unknown user");
    return null;
  }
  await supabase.from("hot_deals").insert({ user_id: userId, deal_id: dealId });
  const result = await supabase.from("active_deals_view").select().eq("id", dealId).single();

  if (result.error) {
    console.log("Can't get hot deal:", result.error);
    return null;
  }

  return result.data;
}

async function getTopDeals(limit: number): Promise<ActiveDeal[]> {
  const filter = await locationService.createFilterByCurrentLocationAndSelectedCategories();
  filter.limit = limit;

  return await getDealsByFilter(filter);
}

async function getHotDeals(): Promise<ActiveDeal[]> {
  const userId = await authService.getUserId();
  const hotDealsResult = await supabase.from("hot_deals").select().eq("user_id", userId);

  if (hotDealsResult.error) {
    console.log("Can't get hot deals:", hotDealsResult.error);
    return [];
  }

  const activeDealsResult = await supabase
    .from("active_deals_view")
    .select()
    .in(
      "id",
      hotDealsResult.data.map((hot) => hot.deal_id)
    );

  if (activeDealsResult.error) {
    console.log("Can't get hot deals:", activeDealsResult.error);
    return [];
  }

  return enrichDealWithImageUrls(activeDealsResult.data);
}

async function enrichDealWithImageUrls<T extends ActiveDeal[] | Deal[]>(deals: T): Promise<T> {
  for (const deal of deals) {
    if (!deal.id || !deal.dealer_id) {
      console.log("Can't enrich deal with image URLs -> either deal or dealer ID unknown");
      continue;
    }
    deal.imageUrls = await storageService.getDealImages(deal.id, deal.dealer_id);
  }

  return deals;
}

function rotateByCurrentTime(deals: ActiveDeal[]): ActiveDeal[] {
  const nowTime = dateTimeUtils.getTimeString();
  const dealsAfterNow = remove(deals, (deal) => nowTime > dateTimeUtils.getTimeString(deal.start!));

  return [...deals, ...dealsAfterNow];
}

async function toggleLike(deal: ActiveDeal): Promise<number> {
  const userId = await authService.getUserId();

  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("deal_id", deal.id);

  if (error || !userId || !deal.id) {
    console.log("Can't toggle like:", error);
    return deal.likes || 0;
  }

  const query =
    count === 0
      ? supabase.from("likes").insert({
          user_id: userId,
          deal_id: deal.id
        })
      : supabase.from("likes").delete().eq("user_id", userId).eq("deal_id", deal.id);

  await query;

  if (!deal.likes) {
    deal.likes = 0;
  }

  return count === 0 ? deal.likes + 1 : deal.likes - 1;
}

export function newDeal(): DealUpsert {
  return {
    dealer_id: "",
    start: getDateTimeAsIsoString(new Date(), 60),
    title: "",
    description: "",
    duration: 24,
    template: false,
    category_id: 1
  };
}

export default {
  deleteDeal,
  getActiveDealsByDealer,
  getFutureDealsByDealer,
  getPastDealsByDealer,
  getTemplatesByDealer,
  getDeal,
  getDealsByFilter,
  getHotDeals,
  getTopDeals,
  newDeal,
  rotateByCurrentTime,
  toggleHotDeal,
  toggleLike,
  upsertDeal
};
