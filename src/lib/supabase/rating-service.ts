import type { Rating, RatingUpdate } from "./public-types";
import { supabase } from "./supabase-client";

async function getRatings(dealerId: string): Promise<Rating[]> {
  const { data } = await supabase.from("dealer_ratings_view").select().eq("dealer_id", dealerId);

  if (!data) {
    return [];
  }

  return data;
}

async function saveRating(rating: RatingUpdate) {
  const { error } = await supabase.from("dealer_ratings").insert(rating);

  if (error) {
    console.error("Can't save rating:", error);
  }
}

export default {
  getRatings,
  saveRating
};
