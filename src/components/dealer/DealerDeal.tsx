import DealContainer from "~/components/deal/DealContainer";
import DealerDealDetails from "~/components/dealer/DealerDealDetails";
import UserDealDetails from "~/components/user/UserDealDetails";
import sessionStore from "~/lib/stores/session-store";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function DealerDeal(props: { deal: ActiveDeal; onClick: () => void; showDetails: boolean }) {
  const rightAction = <></>;

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
