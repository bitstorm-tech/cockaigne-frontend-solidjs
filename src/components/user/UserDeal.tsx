import DealContainer from "~/components/deal/DealContainer";
import FireIcon from "~/components/ui/icons/FireIcon";
import UserDealDetails from "~/components/user/UserDealDetails";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function UserDeal(props: { deal: ActiveDeal; showDetails: boolean; onClick: () => void }) {
  const rightAction = (
    <button class="cursor-pointer">
      <FireIcon outline />
    </button>
  );

  return (
    <DealContainer deal={props.deal} onClick={props.onClick} showDetails={props.showDetails} rightAction={rightAction}>
      <UserDealDetails deal={props.deal} />
    </DealContainer>
  );
}
