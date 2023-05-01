import { addressToShortString, getAddress } from "~/lib/geo/address.service";
import { munichPosition, Position, toPostGisPoint } from "~/lib/geo/geo.types";
import { getUserId } from "~/lib/supabase/auth-service";
import { DealFilter } from "~/lib/supabase/deal-service";
import { supabase } from "./supabase-client";

export async function useCurrentLocation(): Promise<boolean> {
  const userId = await getUserId();
  const { error, data } = await supabase.from("accounts").select("use_current_location").eq("id", userId).single();

  if (error) {
    console.error("Can't get useCurrentLocation:", error.message);
    return false;
  }

  return data.use_current_location || false;
}

export async function saveUseCurrentLocation(useCurrentLocation: boolean) {
  const userId = await getUserId();
  const { error } = await supabase.from("accounts").update({ use_current_location: useCurrentLocation }).eq("id", userId);

  if (error) {
    console.error("Can't save use current location:", error.message);
  }
}

export async function getLocation(): Promise<Position> {
  const userId = await getUserId();
  const { error, data } = await supabase.from("accounts").select("location").eq("id", userId).single();

  if (error || !data.location) {
    console.error("Can't get location:", error?.message);
    return munichPosition;
  }

  const longitude = data.location.coordinates[0];
  const latitude = data.location.coordinates[1];

  return {
    longitude,
    latitude
  };
}

export async function saveLocation(location: Position) {
  const userId = await getUserId();
  const point = toPostGisPoint(location);
  await supabase.from("accounts").update({ location: point }).eq("id", userId);
}

export async function createFilterByCurrentLocationAndSelectedCategories(): Promise<DealFilter> {
  const userId = await getUserId();
  const { error, data } = await supabase.from("accounts").select("search_radius, location").eq("id", userId).single();

  if (error) {
    console.error("Can't create filter by current location:", error.message);
    return {};
  }

  const result2 = await supabase.from("selected_categories").select("category_id").eq("user_id", userId);

  if (result2.error) {
    console.error("Can't create filter by selected categories:", result2.error.message);
    return {};
  }

  return {
    categoryIds: result2.data.map((result) => result.category_id),
    radius: data.search_radius / 2 ?? 250,
    location: data.location
      ? {
          longitude: data.location.coordinates[0],
          latitude: data.location.coordinates[1]
        }
      : munichPosition
  };
}

export async function getSearchRadius(): Promise<number> {
  const userId = await getUserId();

  if (!userId) {
    console.error("Can't get search radius -> unknown user");
    return 500;
  }

  const { error, data } = await supabase.from("accounts").select("search_radius").eq("id", userId).single();

  if (!data) {
    console.error("Can't get search radius:", error?.message);
    return 500;
  }

  return data.search_radius || 500;
}

export async function saveSearchRadius(searchRadius: number) {
  const userId = await getUserId();
  await supabase.from("accounts").update({ search_radius: searchRadius }).eq("id", userId);
}

export async function getCurrentAddress(): Promise<string[]> {
  const location = await getLocation();
  const longAddress = await getAddress(location);
  return addressToShortString(longAddress);
}

export async function getLocationFromAddress(
  street: string,
  houseNumber: string,
  city: string,
  zip: string
): Promise<Position | null> {
  const query = `format=json&street=${houseNumber} ${street}&city=${city}&postalcode=${zip}`;
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${query}`);
  const geoInformation = await response.json();

  if (geoInformation.length === 0) {
    console.error("Can't find location for address:", street, houseNumber, zip, city);
    return null;
  }

  return {
    latitude: geoInformation[0].lat,
    longitude: geoInformation[0].lon
  };
}
