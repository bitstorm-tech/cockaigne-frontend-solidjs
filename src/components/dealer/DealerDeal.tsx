import { useNavigate } from "@solidjs/router";
import DealContainer from "~/components/deal/DealContainer";
import DealerDealDetails from "~/components/dealer/DealerDealDetails";
import GearIcon from "~/components/ui/icons/GearIcon";
import UserDealDetails from "~/components/user/UserDealDetails";
import sessionStore from "~/lib/stores/session-store";
import { FutureActivePastDeal } from "~/lib/supabase/public-types";

export default function DealerDeal(props: {
  deal: FutureActivePastDeal;
  onClick: () => void;
  showDetails: boolean;
  showRightAction?: boolean;
}) {
  const navigate = useNavigate();

  const rightAction = sessionStore.isDealer && props.showRightAction && (
    <button onClick={() => navigate("/deals/edit/" + props.deal.id)}>
      <GearIcon />
    </button>
  );

  return (
    <DealContainer
      deal={props.deal}
      onClick={props.onClick}
      showDetails={props.showDetails}
      rightAction={rightAction}
      showCompanyName={false}
    >
      {sessionStore.isDealer ? <DealerDealDetails deal={props.deal} /> : <UserDealDetails deal={props.deal} />}
    </DealContainer>
  );
}
