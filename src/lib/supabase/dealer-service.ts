import { getUserId } from "~/lib/supabase/auth-service";
import type { Dealer, FavoriteDealer } from "./public-types";
import { supabase } from "./supabase-client";

export async function getDealer(dealerId: string): Promise<Dealer | null> {
  const { data } = await supabase.from("dealer_view").select().eq("id", dealerId).single();

  if (!data) {
    return null;
  }

  return data;
}

export async function toggleFavoriteDealer(dealerId: string) {
  const userId = await getUserId();

  if (!userId) return;

  const { data } = await supabase.from("favorite_dealers").select("user_id").eq("user_id", userId).eq("dealer_id", dealerId);

  if (data?.length === 0) {
    await supabase.from("favorite_dealers").insert([{ user_id: userId, dealer_id: dealerId }]);
  } else {
    await supabase.from("favorite_dealers").delete().eq("user_id", userId).eq("dealer_id", dealerId);
  }
}

export async function isFavoriteDealer(dealerId: string): Promise<boolean> {
  const userId = await getUserId();

  if (!userId) return false;

  const { data, error } = await supabase
    .from("favorite_dealers")
    .select("dealer_id")
    .eq("user_id", userId)
    .eq("dealer_id", dealerId);

  if (error) {
    console.error("Can't check if dealer is favorite:", error.message);
    return false;
  }

  return data.length !== 0;
}

export async function getFavoriteDealers(): Promise<FavoriteDealer[]> {
  const userId = await getUserId();

  if (!userId) return [];

  const { data } = await supabase.from("favorite_dealers_view").select().eq("user_id", userId);

  if (!data) {
    return [];
  }

  return data;
}
