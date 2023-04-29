import { DealerRatingInsert, DealerRatingWithUsername } from "~/lib/supabase/public-types";
import { supabase } from "./supabase-client";

export async function getRatings(dealerId: string): Promise<DealerRatingWithUsername[]> {
  const { data } = await supabase.from("dealer_ratings_view").select().eq("dealer_id", dealerId);

  if (!data) {
    return [];
  }

  return data;
}

export async function saveRating(rating: DealerRatingInsert): Promise<DealerRatingWithUsername | undefined> {
  const { error, data } = await supabase.from("dealer_ratings").insert(rating);

  if (error) {
    console.error("Can't save rating:", error.message);
    return;
  }

  const result = await supabase
    .from("dealer_ratings_view")
    .select()
    .eq("user_id", rating.user_id)
    .eq("dealer_id", rating.dealer_id)
    .single();

  if (result.error) {
    console.error("Can't get dealer rating after save:", result.error.message);
    return;
  }

  return result.data;
}
