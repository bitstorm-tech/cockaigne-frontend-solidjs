import { createSignal } from "solid-js";
import { Position } from "~/lib/geo/geo.types";
import { getLocation, getSearchRadius } from "~/lib/supabase/location-service";

export const [location, setLocation] = createSignal<Position>();
export const [searchRadius, setSearchRadius] = createSignal(500);

export async function initLocationStore() {
  const [location, searchRadius] = await Promise.all([getLocation(), getSearchRadius()]);
  setLocation(location);
  setSearchRadius(searchRadius);
}
