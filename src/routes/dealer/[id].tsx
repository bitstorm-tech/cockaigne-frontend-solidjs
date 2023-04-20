import { useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import DealerHeader from "~/components/dealer/DealerHeader";
import RatingList from "~/components/dealer/rating/RatingList";
import Button from "~/components/ui/Button";
import DealIcon from "~/components/ui/icons/DealIcon";
import HeartIcon from "~/components/ui/icons/HeartIcon";
import ImageIcon from "~/components/ui/icons/ImageIcon";
import RatingIcon from "~/components/ui/icons/RatingIcon";
import sessionStore from "~/lib/stores/session-store";

export default function Dealer() {
  const params = useParams();
  const [tabIndex, setTabIndex] = createSignal(0);

  function toggleFavorite() {}

  return (
    <>
      <DealerHeader id={params.id}>
        <>
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
        </>
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
      {tabIndex() === 0 && <h1>Tab 1</h1>}
      {tabIndex() === 1 && <h1>Tab 2</h1>}
      {tabIndex() === 2 && <RatingList id={params.id} />}
      {/*<Show when={tabIndex() === 0}>*/}
      {/*  */}
      {/*<DealsList {deals} />*/}
      {/*</Show>*/}
      {/*{#if activeTab === 0}*/}
      {/*{:else if activeTab === 1}*/}
      {/*<Pictures {pictures} companyName={account.username} />*/}
      {/*{:else}*/}
      {/*<RatingsList {dealerId} userId={$page.data.user.id} isDealer={$page.data.user.isDealer} />*/}
      {/*{/if}*/}
    </>
  );
}
