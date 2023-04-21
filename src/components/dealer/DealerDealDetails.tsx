import DealDetailsContainer from "~/components/deal/DealDetailsContainer";
import LikeIcon from "~/components/ui/icons/LikeIcon";
import { ActiveDeal } from "~/lib/supabase/public-types";
import { formatDate } from "~/lib/utils/date-time.utils";

export default function DealerDealDetails(props: { deal: ActiveDeal | Deal }) {
  return (
    <DealDetailsContainer deal={props.deal}>
      <div class="flex justify-between text-xs">
        <span>Von: {formatDate(props.deal.start!)}</span>
        <div class="flex items-center gap-1">
          <span>{props.deal.likes}</span>
          <LikeIcon size={0.8} />
        </div>
        <span>Bis: {formatDate(props.deal.start!, +props.deal.duration! * 60)}</span>
      </div>
    </DealDetailsContainer>
  );
}
