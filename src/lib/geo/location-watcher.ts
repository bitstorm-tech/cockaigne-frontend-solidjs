import { debounce } from "lodash";
import { Position } from "~/lib/geo/geo.types";
import { setLocation } from "~/lib/stores/location-store";
import { saveLocation } from "~/lib/supabase/location-service";

let watcherId = -1;

const saveLocationDebounced = debounce(async (location: Position) => {
  await saveLocation(location);
}, 10000);

export function startLocationWatching() {
  if (watcherId === -1) {
    console.log("[LocationWatcher] start watching ...");
    watcherId = window.navigator.geolocation.watchPosition((geolocationPosition) => {
      const currentLocation = {
        longitude: geolocationPosition.coords.longitude,
        latitude: geolocationPosition.coords.latitude
      };
      setLocation(currentLocation);
      saveLocationDebounced(currentLocation);
    });
  }
}

export function stopLocationWatching() {
  if (watcherId) {
    console.log("[LocationWatcher] stop watching ...");
    window.navigator.geolocation.clearWatch(watcherId);
    watcherId = -1;
  }
}
