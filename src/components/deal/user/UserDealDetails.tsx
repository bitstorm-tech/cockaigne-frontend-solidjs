import { createSignal } from "solid-js";
import DealDetailsContainer from "~/components/deal/DealDetailsContainer";
import LikeIcon from "~/components/ui/icons/LikeIcon";
import ReportIcon from "~/components/ui/icons/ReportIcon";
import { ActiveDeal } from "~/lib/supabase/public-types";
import { formatDate } from "~/lib/utils/date-time.utils";

export default function UserDealDetails(props: { deal: ActiveDeal }) {
  const [openReportModal, setOpenReportModal] = createSignal(false);

  function like() {}

  return (
    <DealDetailsContainer deal={props.deal}>
      <span class="py-4 text-xs">Endet am {formatDate(props.deal.start!!, +props.deal.duration!! * 60)}</span>
      <div class="flex h-6 justify-between">
        <div class="flex items-center gap-3">
          <button onClick={like}>
            {/*<LikeIcon size={1.3} dislike={$likeStore.includes(deal.id)} />*/}
            <LikeIcon size={1.3} />
          </button>
          <span class="text-lg">{props.deal.likes}</span>
        </div>
        <button onClick={() => setOpenReportModal(true)}>
          <ReportIcon size={1.3} />
        </button>
      </div>
    </DealDetailsContainer>
  );
}
