import { isServer } from "solid-js/web";
import { setLocation } from "~/lib/stores/location-store";
import { getUseCurrentLocation, saveLocation } from "~/lib/supabase/location-service";

let watcherId = -1;

export function startLocationWatching() {
  if (watcherId === -1 && !isServer) {
    console.log("[LocationWatcher] start watching ...");
    watcherId = window.navigator.geolocation.watchPosition((geolocationPosition) => {
      const currentLocation = {
        longitude: geolocationPosition.coords.longitude,
        latitude: geolocationPosition.coords.latitude
      };
      setLocation(currentLocation);
      saveLocation(currentLocation).then();
    });
  }
}

export function stopLocationWatching() {
  if (watcherId && !isServer) {
    console.log("[LocationWatcher] stop watching ...");
    window.navigator.geolocation.clearWatch(watcherId);
    watcherId = -1;
  }
}

export async function initLocationWatcher() {
  const useCurrentLocation = await getUseCurrentLocation();
  useCurrentLocation ? startLocationWatching() : stopLocationWatching();
}
