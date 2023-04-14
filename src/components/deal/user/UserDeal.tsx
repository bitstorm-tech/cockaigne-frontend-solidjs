import DealContainer from "~/components/deal/DealContainer";
import UserDealDetails from "~/components/deal/user/UserDealDetails";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function UserDeal(props: { deal: ActiveDeal; showDetails: boolean; onClick: () => void }) {
  return (
    <DealContainer deal={props.deal} onClick={props.onClick} showDetails={props.showDetails}>
      <UserDealDetails deal={props.deal} />
    </DealContainer>
  );
}
