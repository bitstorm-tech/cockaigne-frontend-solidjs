import DealContainer from "~/components/deal/DealContainer";
import UserDealDetails from "~/components/deal/user/UserDealDetails";
import FireIcon from "~/components/ui/icons/FireIcon";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function UserDeal(props: { deal: ActiveDeal; showDetails: boolean; onClick: () => void }) {
  const rightAction = (
    <button class="cursor-pointer">
      <FireIcon />
    </button>
  );

  return (
    <DealContainer deal={props.deal} onClick={props.onClick} showDetails={props.showDetails} rightAction={rightAction}>
      <UserDealDetails deal={props.deal} />
    </DealContainer>
  );
}
