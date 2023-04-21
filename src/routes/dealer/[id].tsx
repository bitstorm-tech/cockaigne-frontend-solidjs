import { useParams } from "@solidjs/router";
import { createResource, createSignal, onMount, Show } from "solid-js";
import DealerDealList from "~/components/dealer/DealerDealList";
import DealerHeader from "~/components/dealer/DealerHeader";
import DealerImages from "~/components/dealer/DealerImages";
import RatingList from "~/components/dealer/rating/RatingList";
import Button from "~/components/ui/Button";
import DealIcon from "~/components/ui/icons/DealIcon";
import HeartIcon from "~/components/ui/icons/HeartIcon";
import ImageIcon from "~/components/ui/icons/ImageIcon";
import RatingIcon from "~/components/ui/icons/RatingIcon";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import sessionStore from "~/lib/stores/session-store";
import accountService from "~/lib/supabase/account-service";
import dealService from "~/lib/supabase/deal-service";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function Dealer() {
  const params = useParams();
  const [tabIndex, setTabIndex] = createSignal(0);
  const [companyName] = createResource(async () => await accountService.getUsername(params.id), { initialValue: "" });
  const [deals] = createResource(async () => (await dealService.getActiveDealsByDealer(params.id)) as ActiveDeal[], {
    initialValue: []
  });

  onMount(() => setCurrentPage("home"));

  function toggleFavorite() {}

  return (
    <>
      <DealerHeader id={params.id}>
        <Show when={sessionStore.isDealer}>
          <a href={"/deals/new?dealerId=" + params.id} class="mt-4">
            <Button warning>
              Neuer
              <br />
              Deal
            </Button>
          </a>
        </Show>
        <Show when={!sessionStore.isDealer}>
          <Button onClick={toggleFavorite} circle warning>
            <HeartIcon outline={true} />
          </Button>
        </Show>
      </DealerHeader>
      <div class="mb-1 mt-4 grid grid-cols-3">
        <button class="tab-bordered tab" classList={{ "tab-active": tabIndex() === 0 }} onClick={() => setTabIndex(0)}>
          <DealIcon outline={tabIndex() !== 0} />
        </button>
        <button class="tab-bordered tab" classList={{ "tab-active": tabIndex() === 1 }} onClick={() => setTabIndex(1)}>
          <ImageIcon outline={tabIndex() !== 1} />
        </button>
        <button class="tab-bordered tab" classList={{ "tab-active": tabIndex() === 2 }} onClick={() => setTabIndex(2)}>
          <RatingIcon outline={tabIndex() !== 2} />
        </button>
      </div>
      {tabIndex() === 0 && <DealerDealList deals={deals()} />}
      {tabIndex() === 1 && <DealerImages companyName={companyName()} />}
      {tabIndex() === 2 && <RatingList id={params.id} />}
    </>
  );
}
