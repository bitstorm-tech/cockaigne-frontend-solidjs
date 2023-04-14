import { locationStore } from "$lib/stores/location.store";

export default class LocationService {
  private static watcherId = -1;

  static startWatching() {
    if (this.watcherId === -1) {
      console.log("[LocationWatcher] start watching ...");
      this.watcherId = window.navigator.geolocation.watchPosition((geolocationPosition) => {
        const currentLocation = {
          longitude: geolocationPosition.coords.longitude,
          latitude: geolocationPosition.coords.latitude
        };
        locationStore.set(currentLocation);
      });
    }
  }

  static stopWatching() {
    if (this.watcherId) {
      console.log("[LocationWatcher] stop watching ...");
      window.navigator.geolocation.clearWatch(this.watcherId);
      this.watcherId = -1;
    }
  }
}
