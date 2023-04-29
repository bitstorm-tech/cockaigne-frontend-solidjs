import remove from "lodash/remove";
import { Extent } from "ol/extent";
import { Position } from "~/lib/geo/geo.types";
import { account } from "~/lib/stores/account-store";
import { getUserId } from "~/lib/supabase/auth-service";
import { getDealImages } from "~/lib/supabase/storage-service";
import dateTimeUtils, { getDateTimeAsIsoString } from "~/lib/utils/date-time.utils";
import { createFilterByCurrentLocationAndSelectedCategories } from "./location-service";
import type {
  ActiveDeal,
  Deal,
  DealUpsert,
  FutureDeal,
  GetActiveDealsWithinExtentFunctionArguments,
  Like,
  PastDeal
} from "./public-types";
import { DealerRatingWithUsername } from "./public-types";
import { supabase } from "./supabase-client";

export interface DealFilter {
  location?: Position;
  radius?: number;
  extent?: Extent;
  categoryIds?: number[];
  limit?: number;
  orderBy?: string;
}

export async function getDeal(id: string): Promise<Deal | undefined> {
  const { data, error } = await supabase.from("deals").select().eq("id", id).single();

  if (error) {
    console.error("Can't get deal:", error.message);
    return;
  }

  const deal: Deal = data;

  if (!deal.imageUrls) {
    deal.imageUrls = [];
  }

  return deal;
}

export async function getActiveDealsByDealer(dealerIds?: string | string[]): Promise<ActiveDeal[]> {
  const ids = dealerIds ? (Array.isArray(dealerIds) ? dealerIds : [dealerIds]) : [await sgetUserId()];
  const { data, error } = await supabase.from("active_deals_view").select().in("dealer_id", ids);

  if (error) {
    console.error("Can't get active deals:", error.message);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

export async function getPastDealsByDealer(): Promise<PastDeal[]> {
  const dealerId = await getUserId();

  if (!dealerId) return [];

  const { data, error } = await supabase.from("past_deals_view").select().eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't get past deals:", error.message);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

export async function getFutureDealsByDealer(): Promise<FutureDeal[]> {
  const dealerId = await getUserId();

  if (!dealerId) return [];

  const { data, error } = await supabase.from("future_deals_view").select().eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't get future deals:", error.message);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

export async function getTemplatesByDealer(): Promise<Deal[]> {
  const dealerId = await getUserId();

  const { data, error } = await supabase.from("deals").select().eq("dealer_id", dealerId).eq("template", true);

  if (error) {
    console.error("Can't get templates:", error.message);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

export async function upsertDeal(deal: DealUpsert, alsoCreateTemplate = false): Promise<string | undefined> {
  const dealerId = await getUserId();

  if (!dealerId) return;

  const _deal = deal;
  delete _deal.imageUrls;

  const resultUpsertDeal = await supabase.from("deals").upsert(_deal).select("id").single();

  if (resultUpsertDeal.error) {
    console.error("Can't upsert deal:", resultUpsertDeal.error.message);
    return;
  }

  if (!alsoCreateTemplate) {
    return resultUpsertDeal.data.id;
  }

  deal.template = true;
  const resultUpsertTemplate = await supabase.from("deals").insert(deal).select("id").single();

  if (resultUpsertTemplate.error) {
    console.error("Can't insert deal template:", resultUpsertTemplate.error.message);
    return resultUpsertDeal.data.id;
  }

  return resultUpsertTemplate.data.id;
}

export async function deleteDeal(dealId: string): Promise<string | undefined> {
  const dealerId = await getUserId();
  const { error } = await supabase.from("deals").delete().eq("id", dealId).eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't delete deal:", error.message);
    return error.message;
  }
}

export function createExtentFromFilter(filter: DealFilter): GetActiveDealsWithinExtentFunctionArguments | null {
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
    console.error("Can't get deals by filter -> no valid extent");
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
    console.error("Can't get deals by filter:", error.message);
    return [];
  }

  return enrichDealWithImageUrls(data);
}

export async function toggleHotDeal(dealId: string): Promise<ActiveDeal | null> {
  const { data } = await supabase.from("hot_deals").select().eq("deal_id", dealId);

  if (data && data.length >= 1) {
    await supabase.from("hot_deals").delete().eq("deal_id", dealId);
    return null;
  }

  const userId = await getUserId();
  if (!userId) {
    console.error("Can't toggle hot deal, unknown user");
    return null;
  }
  await supabase.from("hot_deals").insert({ user_id: userId, deal_id: dealId });
  const result = await supabase.from("active_deals_view").select().eq("id", dealId).single();

  if (result.error) {
    console.error("Can't get hot deal:", result.error.message);
    return null;
  }

  return result.data;
}

export async function getTopDeals(limit: number): Promise<ActiveDeal[]> {
  const filter = await createFilterByCurrentLocationAndSelectedCategories();
  filter.limit = limit;

  return await getDealsByFilter(filter);
}

export async function getHotDeals(): Promise<ActiveDeal[]> {
  const userId = await getUserId();
  const hotDealsResult = await supabase.from("hot_deals").select().eq("user_id", userId);

  if (hotDealsResult.error) {
    console.error("Can't get hot deals:", hotDealsResult.error.message);
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
    console.error("Can't get hot deals:", activeDealsResult.error.message);
    return [];
  }

  return enrichDealWithImageUrls(activeDealsResult.data);
}

export async function enrichDealWithImageUrls(deals: ActiveDeal[]): Promise<ActiveDeal[]> {
  for (const deal of deals) {
    if (!deal.id || !deal.dealer_id) {
      console.error("Can't enrich deal with image URLs -> either deal or dealer ID unknown");
      continue;
    }
    deal.imageUrls = await getDealImages(deal.id, deal.dealer_id);
  }

  return deals;
}

export function rotateByCurrentTime(deals: ActiveDeal[]): ActiveDeal[] {
  const nowTime = dateTimeUtils.getTimeString();
  const dealsAfterNow = remove(deals, (deal) => nowTime > dateTimeUtils.getTimeString(deal.start!));

  return [...deals, ...dealsAfterNow];
}

export async function toggleLike(dealId: string) {
  const userId = await getUserId();

  if (!userId) return 0;

  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("deal_id", dealId);

  if (error) {
    console.error("Can't toggle like:", error.message);
    return;
  }

  const query =
    count === 0
      ? supabase.from("likes").insert({
          user_id: userId,
          deal_id: dealId
        })
      : supabase.from("likes").delete().eq("user_id", userId).eq("deal_id", dealId);

  const result = await query;

  if (result.error) {
    console.error("Can't toggle like:", result.error.message);
  }
}

export async function getLikes(): Promise<Like[]> {
  const userId = await getUserId();

  if (!userId) return [];

  const { data, error } = await supabase.from("likes").select().eq("user_id", userId);

  if (error) {
    console.error("Can't get likes:", error.message);
    return [];
  }

  return data;
}

export function newDeal(): DealUpsert {
  return {
    dealer_id: "",
    start: getDateTimeAsIsoString(new Date(), 60),
    title: "",
    description: "",
    duration: 24,
    template: false,
    category_id: account.default_category || 1
  };
}

export async function getRatingsForDealer(dealerId: string): Promise<DealerRatingWithUsername[]> {
  const { data } = await supabase.from("dealer_ratings_view").select().eq("dealer_id", dealerId);

  if (!data) {
    return [];
  }

  return data;
}
