import { onMount } from "solid-js";
import { setCurrentPage } from "~/lib/stores/navigation-store";

export default function Top() {
  onMount(() => setCurrentPage("top"));
  return <h1>Top Page!</h1>;
}
