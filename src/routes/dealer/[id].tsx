import { useParams } from "@solidjs/router";

export default function Dealer() {
  const params = useParams();

  return (
    <>
      <h1>Dealer Page</h1>
      <span>{params.id}</span>
    </>
  );
}
