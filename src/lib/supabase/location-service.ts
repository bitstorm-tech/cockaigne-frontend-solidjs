import authService from "~/lib/supabase/auth-service";
import { supabase } from "./supabase-client";
import { Position, munichPosition, toPostGisPoint } from "~/lib/geo/geo.types";

async function useCurrentLocation(): Promise<boolean> {
  const userId = await authService.getUserId();
  const { error, data } = await supabase.from("accounts").select("use_current_location").eq("id", userId).single();

  if (error) {
    console.log("Can't get useCurrentLocation:", error);
    return false;
  }

  return data.use_current_location || false;
}

async function saveUseCurrentLocation(useCurrentLocation: boolean) {
  const userId = await authService.getUserId();
  const { error } = await supabase.from("accounts").update({ use_current_location: useCurrentLocation }).eq("id", userId);

  if (error) {
    console.log("Can't save use current location:", error);
  }
}

async function getLocation(): Promise<Position> {
  const userId = await authService.getUserId();
  const { error, data } = await supabase.from("accounts").select("location").eq("id", userId).single();

  if (error || !data.location) {
    console.log("Can't get location:", error);
    return munichPosition;
  }

  const longitude = data.location.coordinates[0];
  const latitude = data.location.coordinates[1];

  return {
    longitude,
    latitude
  };
}

async function saveLocation(location: Position) {
  const userId = await authService.getUserId();
  const point = toPostGisPoint(location);
  await supabase.from("accounts").update({ location: point }).eq("id", userId);
}

async function createFilterByCurrentLocationAndSelectedCategories(): Promise<DealFilter> {
  const userId = await authService.getUserId();
  const { error, data } = await supabase.from("accounts").select("search_radius, location").eq("id", userId).single();

  if (error) {
    console.log("Can't create filter by current location:", error);
    return {};
  }

  const result2 = await supabase.from("selected_categories").select("category_id").eq("user_id", userId);

  if (result2.error) {
    console.log("Can't create filter by selected categories:", result2.error);
    return {};
  }

  return {
    categoryIds: result2.data.map((result) => result.category_id),
    radius: data.search_radius / 2 ?? 250,
    location: {
      longitude: data.location.coordinates[0],
      latitude: data.location.coordinates[1]
    }
  };
}

async function getSearchRadius(): Promise<number> {
  const userId = await authService.getUserId();

  if (!userId) {
    console.log("Can't get search radius -> unknown user");
    return 500;
  }

  const { error, data } = await supabase.from("accounts").select("search_radius").eq("id", userId).single();

  if (!data) {
    console.log("Can't get search radius:", error);
    return 500;
  }

  return data.search_radius || 500;
}

async function saveSearchRadius(searchRadius: number) {
  const userId = await authService.getUserId();
  await supabase.from("accounts").update({ search_radius: searchRadius }).eq("id", userId);
}

export default {
  saveUseCurrentLocation,
  useCurrentLocation,
  getLocation,
  saveLocation,
  createFilterByCurrentLocationAndSelectedCategories,
  getSearchRadius,
  saveSearchRadius
};
