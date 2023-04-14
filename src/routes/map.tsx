import { onMount } from "solid-js";
import { username } from "~/lib/stores/account-store";
import { setCurrentPage } from "~/lib/stores/navigation-store";

export default function Map() {
  onMount(() => setCurrentPage("map"));

  return (
    <>
      <h1>Map Page</h1>
      <span>Store: {username()}</span>
    </>
  );
}
