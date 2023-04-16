import { onMount } from "solid-js";
import DealFilterModal, { setShowDealFilterModal } from "~/components/map/DealFilterModal";
import LocationSettingsModal, { setShowLocationSettingsModal } from "~/components/map/LocationSettingsModal";
import Button from "~/components/ui/Button";
import CrosshairIcon from "~/components/ui/icons/CrosshairIcon";
import FilterIcon from "~/components/ui/icons/FilterIcon";
import LocationIcon from "~/components/ui/icons/LocationIcon";
import { setCurrentPage } from "~/lib/stores/navigation-store";
import { MapService } from "~/lib/utils/map.service";

let mapService: MapService;

export default function Map() {
  onMount(async () => {
    setCurrentPage("map");
    mapService = await MapService.init("map");
    mapService.jumpToCurrentLocation().then();
  });

  function jumpToCurrentLocation() {
    mapService.jumpToCurrentLocation().then();
  }

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
      <div id="map" class="h-[calc(100vh-6rem)] w-screen">
        {/*{#if !mapService}*/}
        {/*<div class="mt-16 flex content-center justify-center gap-2">*/}
        {/*  <h2>Lade Karte</h2>*/}
        {/*  <LoadingSpinner />*/}
        {/*</div>*/}
        {/*{/if}*/}
        {/*{#if searchCurrentAddress}*/}
        {/*  <div class="relative top-1/3 z-[1000] flex content-center justify-center gap-4 bg-gray-500 py-6 text-xl opacity-75">*/}
        {/*  <span>Ermittele aktuellen Standort</span>*/}
        {/*  <LoadingSpinner />*/}
        {/*  </div>*/}
        {/*{/if}*/}
      </div>
      <LocationSettingsModal />
      <DealFilterModal />
    </>
  );
}
