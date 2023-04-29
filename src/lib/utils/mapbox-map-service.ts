import mapboxgl, { Map } from "mapbox-gl";
import { getLocation } from "~/lib/supabase/location-service";
import { toMapboxCoordinates } from "./geo/geo.types";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZWYtYmF1ZXIiLCJhIjoiY2xmbnMxeHQ4MHA1MzNwcms5MnlvbGwydiJ9.uFWknM7lW9oAwvd9sgC3oA";
let map: Map;

async function init(htmlElementId: string) {
  const location = await getLocation();

  map = new mapboxgl.Map({
    container: htmlElementId,
    style: "mapbox://styles/josef-bauer/clfns6o4x00x401pe8o8jn7vm",
    center: toMapboxCoordinates(location),
    zoom: 15
  });
}
