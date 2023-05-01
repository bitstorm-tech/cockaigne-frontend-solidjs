import { useSearchParams } from "@solidjs/router";
import { onMount } from "solid-js";
import DealFilterModal, { setShowDealFilterModal } from "~/components/map/DealFilterModal";
import LocationSettingsModal, { setShowLocationSettingsModal } from "~/components/map/LocationSettingsModal";
import Button from "~/components/ui/Button";
import CrosshairIcon from "~/components/ui/icons/CrosshairIcon";
import FilterIcon from "~/components/ui/icons/FilterIcon";
import LocationIcon from "~/components/ui/icons/LocationIcon";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import { initMapService, jumpToCurrentLocation } from "~/lib/utils/map.service";

export default function Map() {
  const [searchParams] = useSearchParams();

  onMount(async () => {
    setCurrentPage("map");
    setShowDealFilterModal(!!searchParams.showFilter);
    await initMapService("map");
    jumpToCurrentLocation().then();
  });

  return (
    <>
      <div class="fixed right-1 top-12 z-10 m-3 grid grid-cols-3 gap-2">
        <Button circle onClick={() => setShowLocationSettingsModal(true)}>
          <LocationIcon />
        </Button>
        <Button circle onClick={() => setShowDealFilterModal(true)}>
          <FilterIcon />
        </Button>
        <Button circle onClick={jumpToCurrentLocation}>
          <CrosshairIcon />
        </Button>
      </div>
      <div id="map" class="h-[calc(100vh-6rem)] w-screen"></div>
      <LocationSettingsModal />
      <DealFilterModal />
    </>
  );
}
