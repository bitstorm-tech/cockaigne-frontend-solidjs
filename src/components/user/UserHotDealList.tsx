import { A } from "solid-start";
import EmptyContent from "~/components/ui/EmptyContent";
import UserDealList from "~/components/user/UserDealList";
import { hotDeals } from "~/lib/stores/deal-store";
import sessionStore from "~/lib/stores/session-store";

export default function UserHotDealList() {
  const emptyContent = (
    <EmptyContent>
      {sessionStore.userId ? (
        <span>Hier gibt es noch keine heißen Deals.</span>
      ) : (
        <span>
          Du willst deine ganz persönliche Liste von heißen Deals erstellen? Dann{" "}
          <A href="/registration">
            <u>registriere</u>
          </A>{" "}
          dich jetzt kostenlos!
        </span>
      )}
    </EmptyContent>
  );

  return <UserDealList deals={hotDeals()} emptyContent={emptyContent} />;
}
