import { useParams } from "@solidjs/router";
import EmptyContent from "~/components/ui/EmptyContent";

export default function Activate() {
  const params = useParams();
  return <EmptyContent>Activate Account: {params.email}</EmptyContent>;
}
