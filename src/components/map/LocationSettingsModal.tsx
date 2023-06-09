import { createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import Checkbox from "~/components/ui/Checkbox";
import Modal from "~/components/ui/Modal";
import Textarea from "~/components/ui/Textarea";
import { addressToString, getAddress } from "~/lib/geo/address.service";
import { Position } from "~/lib/geo/geo.types";
import locationService from "~/lib/supabase/location-service";

export const [showLocationSettingsModal, setShowLocationSettingsModal] = createSignal(false);

export default function LocationSettingsModal() {
  const [loading, setLoading] = createSignal(false);
  const [address, setAddress] = createSignal("");
  const [useCurrentLocation, setUseCurrentLocation] = createSignal(false);

  const button = <Button onClick={() => setShowLocationSettingsModal(false)}>Übernehmen</Button>;

  async function onShow() {
    setUseCurrentLocation(await locationService.useCurrentLocation());
    const location = await locationService.getLocation();
    const newAddress = await getAddress(location);

    if (newAddress) {
      setAddress(addressToString(newAddress));
    }
  }

  async function search() {
    setLoading(true);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
    const response = await fetch(url);

    if (response.ok) {
      const addresses = await response.json();
      if (addresses.length === 0) {
        return;
      }

      const location: Position = {
        latitude: +addresses[0].lat,
        longitude: +addresses[0].lon
      };

      // locationStore.set(location);
    }

    setLoading(false);
  }

  async function searchCurrentLocation(checked: boolean) {
    setUseCurrentLocation(checked);
    // useCurrentLocation ? LocationService.startWatching() : LocationService.stopWatching();
  }

  return (
    <Modal
      show={showLocationSettingsModal()}
      onShow={onShow}
      onClose={() => setShowLocationSettingsModal(false)}
      buttons={button}
    >
      <div class="m-2 flex flex-col gap-3">
        <Textarea label="Adresse" value={address()} onEnter={search} disabled={useCurrentLocation()} lines={2} />
        <Button onClick={search} disabled={useCurrentLocation()} loading={loading()}>
          Suchen
        </Button>
        <Checkbox label="Aktuellen Standort verwenden" checked={useCurrentLocation()} onChange={searchCurrentLocation} />
      </div>
    </Modal>
  );
}
