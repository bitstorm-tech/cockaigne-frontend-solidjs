import { A } from "solid-start";
import EmptyContent from "~/components/ui/EmptyContent";
import sessionStore from "~/lib/stores/session-store";

export default function UserFavoriteDealerList() {
  return <EmptyContent>{sessionStore.userId ? <NoDealsYet /> : <Register />}</EmptyContent>;
}

const Register = () => (
  <span>
    <A href="/registration">
      <u>Registriere</u>
    </A>{" "}
    dich jetzt und ...
  </span>
);

const NoDealsYet = () => <span>Du hast noch keinen Dealer als Favoriten gespeichert ... worauf wartest du!</span>;
