import { onMount } from "solid-js";
import { useNavigate } from "solid-start";
import sessionStore from "~/lib/stores/session-store";

export default function Home() {
  const navigate = useNavigate();

  onMount(() => {
    sessionStore.userId && sessionStore.isDealer ? navigate("/dealer/" + sessionStore.userId) : navigate("/user");
  });
}
