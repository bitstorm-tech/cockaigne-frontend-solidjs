import { useNavigate } from "@solidjs/router";
import { createResource, createSignal, onMount } from "solid-js";
import DealerDealList from "~/components/dealer/DealerDealList";
import Button from "~/components/ui/Button";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import { getActiveDealsByDealer, getFutureDealsByDealer, getPastDealsByDealer } from "~/lib/supabase/deal-service";

export default function Overview() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = createSignal(0);
  const [activeDeals] = createResource(async () => await getActiveDealsByDealer(), { initialValue: [] });
  const [futureDeals] = createResource(async () => await getFutureDealsByDealer(), { initialValue: [] });
  const [pastDeals] = createResource(async () => await getPastDealsByDealer(), { initialValue: [] });

  onMount(() => setCurrentPage("dealOverview"));

  return (
    <>
      <div class="flex flex-col p-3">
        <div class="grid grid-cols-2 gap-3">
          <Button warning onClick={() => navigate("/deals/edit")}>
            Deal erstellen
          </Button>
          <Button onClick={() => navigate("/deals/templates")}>Vorlagen</Button>
        </div>
      </div>
      <div class="tabs mb-2 mt-6 max-h-8">
        <button onClick={() => setTabIndex(0)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 0 }}>
          Aktiv
        </button>
        <button onClick={() => setTabIndex(1)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 1 }}>
          Geplant
        </button>
        <button onClick={() => setTabIndex(2)} class="tab-bordered tab grow" classList={{ "tab-active": tabIndex() === 2 }}>
          Abgelaufen
        </button>
      </div>
      {tabIndex() === 0 && <DealerDealList deals={activeDeals()} />}
      {tabIndex() === 1 && <DealerDealList deals={futureDeals()} showRightActions={true} />}
      {tabIndex() === 2 && <DealerDealList deals={pastDeals()} />}
    </>
  );
}
