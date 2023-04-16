import { createResource, createSignal, onMount } from "solid-js";
import UserDealList from "~/components/user/UserDealList";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import dealService from "~/lib/supabase/deal-service";

export default function Top() {
  const [tabIndex, setTabIndex] = createSignal(10);

  const [deals] = createResource(
    () => tabIndex(),
    async (numberOfDeals: number) => {
      return dealService.getTopDeals(numberOfDeals);
    }
  );

  onMount(() => {
    setCurrentPage("top");
  });

  return (
    <>
      <p class="my-4 text-center">TOP-Deals in deiner Nähe</p>
      <div class="tabs mb-1 flex max-h-8">
        <button onClick={() => setTabIndex(10)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 10}>
          Top 10
        </button>
        <button onClick={() => setTabIndex(25)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 25}>
          Top 25
        </button>
        <button onClick={() => setTabIndex(50)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 50}>
          Top 50
        </button>
        <button onClick={() => setTabIndex(100)} class="tab-bordered tab grow" class:tab-active={tabIndex() === 100}>
          Top 100
        </button>
      </div>
      <UserDealList deals={deals()!} />
    </>
  );
}
