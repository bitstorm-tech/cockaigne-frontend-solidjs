import { createSignal } from "solid-js";
import { munichPosition } from "~/lib/geo/geo.types";
import { getLocation } from "~/lib/supabase/account-service";
import { getSearchRadius } from "~/lib/supabase/location-service";

export const [location, setLocation] = createSignal(munichPosition);
export const [searchRadius, setSearchRadius] = createSignal(500);

export async function initLocationStore() {
  const [location, searchRadius] = await Promise.all([getLocation(), getSearchRadius()]);
  setLocation(location);
  setSearchRadius(searchRadius);
}
