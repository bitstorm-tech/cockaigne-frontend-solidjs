import RatingStars from "~/components/dealer/rating/RatingStars";
import ProfileImage from "~/components/user/ProfileImage";
import { DealerRatingWithUsername } from "~/lib/supabase/public-types";

export default function RatingListEntry(props: { rating: DealerRatingWithUsername }) {
  return (
    <div class="flex flex-col">
      <div class="flex items-center justify-between border-y border-base-300 bg-base-200 py-2 pl-20 pr-4">
        <div class="absolute left-4 pt-8">
          <ProfileImage id={props.rating.user_id!} size={3} />
        </div>
        <div>{props.rating.username}</div>
        <RatingStars stars={props.rating.stars!} showLabel={false} disabled={true} />
      </div>
      <div class="bg-base-100 p-2 pt-6 text-xs">{props.rating.rating_text}</div>
    </div>
  );
}
