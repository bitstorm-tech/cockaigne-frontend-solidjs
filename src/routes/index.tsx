import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import sessionStore from "~/lib/stores/session-store";

export default function Home() {
  const navigate = useNavigate();
  onMount(() => {
    if (sessionStore.userId && sessionStore.isDealer) {
      navigate("/dealer/" + sessionStore.userId);
    }

    navigate("/user");
  });
}
