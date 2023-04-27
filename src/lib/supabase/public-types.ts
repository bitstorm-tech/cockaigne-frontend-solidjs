import type { Database } from "./generated-types";

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Account = Database["public"]["Tables"]["accounts"]["Row"] & { profileImageUrl?: string };
export type AccountUpdate = Database["public"]["Tables"]["accounts"]["Update"];
export type AccountInsert = Database["public"]["Tables"]["accounts"]["Insert"] & { password: string };
export type ActiveDeal = Required<NonNullableFields<Database["public"]["Views"]["active_deals_view"]["Row"]>> & {
  isHot?: boolean;
  isLiked?: boolean;
  imageUrls?: string[];
};
export type FutureDeal = Required<NonNullableFields<Database["public"]["Views"]["future_deals_view"]["Row"]>> & {
  imageUrls?: string[];
};
export type PastDeal = Required<NonNullableFields<Database["public"]["Views"]["past_deals_view"]["Row"]>> & {
  imageUrls?: string[];
};
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Deal = Omit<Database["public"]["Tables"]["deals"]["Row"], "created"> & { imageUrls?: string[] };
export type DealUpsert = Omit<Database["public"]["Tables"]["deals"]["Insert"], "created"> & { imageUrls?: string[] };
export type Dealer = Required<NonNullableFields<Database["public"]["Views"]["dealer_view"]["Row"]>>;
export type FavoriteDealer = Required<NonNullableFields<Database["public"]["Views"]["favorite_dealers_view"]["Row"]>>;
export type HotDeal = Required<NonNullableFields<Database["public"]["Tables"]["hot_deals"]["Row"]>>;
export type DealerRatingWithUsername = Required<NonNullableFields<Database["public"]["Views"]["dealer_ratings_view"]["Row"]>>;
export type DealerRatingInsert = Database["public"]["Tables"]["dealer_ratings"]["Insert"];
export type ReportedDeal = Database["public"]["Tables"]["reported_deals"]["Row"];
export type SelectedCategory = Database["public"]["Tables"]["selected_categories"]["Row"];
export type GetActiveDealsWithinExtentFunctionArguments =
  Database["public"]["Functions"]["get_active_deals_within_extent"]["Args"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];

export type FutureActivePastDeal = FutureDeal | ActiveDeal | PastDeal;
