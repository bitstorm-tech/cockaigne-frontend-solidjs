import { debounce } from "lodash";
import { Feature, View } from "ol";
import type { Coordinate } from "ol/coordinate";
import type { Extent } from "ol/extent";
import { Point } from "ol/geom";
import Circle from "ol/geom/Circle";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import "ol/ol.css";
import { useGeographic } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { fromOpenLayersCoordinate, Position, toOpenLayersCoordinate } from "~/lib/geo/geo.types";
import { DealFilter, getDealsByFilter } from "~/lib/supabase/deal-service";
import {
  getLocation,
  getSearchRadius,
  saveLocation,
  saveSearchRadius,
  useCurrentLocation
} from "~/lib/supabase/location-service";
import { ActiveDeal } from "~/lib/supabase/public-types";
import { getIconPathById } from "./icon-mapping";

export class MapService {
  private map!: Map;
  private dealLayerSource = new VectorSource();
  private view = new View({
    zoom: 16,
    maxZoom: 20
  });
  private circle!: Circle;
  private centerPoint!: Circle;

  private updateDeals = debounce(async (extent: Extent) => {
    const filter: DealFilter = {
      categoryIds: [],
      extent
    };

    const deals = await getDealsByFilter(filter);
    this.setDeals(deals);
  }, 1000);

  static async init(htmlElementId: string): Promise<MapService> {
    const mapService = new MapService();
    useGeographic();
    const location = await getLocation();
    const center = toOpenLayersCoordinate(location);

    mapService.view.setCenter(center);

    mapService.centerPoint = new Circle(center, mapService.transformRadius(2));

    const searchRadius = await getSearchRadius();
    mapService.circle = new Circle(center, mapService.transformRadius(searchRadius));

    mapService.map = new Map({
      target: htmlElementId,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: mapService.dealLayerSource,
          style: new Style({
            stroke: new Stroke({
              color: "red",
              width: 3
            }),
            fill: new Fill({
              color: "red"
            })
          })
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(mapService.circle), new Feature(mapService.centerPoint)]
          }),
          style: new Style({
            stroke: new Stroke({
              color: "blue",
              width: 3
            }),
            fill: new Fill({
              color: "rgba(0, 0, 225, 0.1)"
            })
          })
        })
      ],
      view: mapService.view
    });

    mapService.map.on("click", async (event) => {
      const _useCurrentLocation = await useCurrentLocation();

      if (_useCurrentLocation) {
        return;
      }

      mapService.moveCircle(event.coordinate);
      mapService.saveCenter(event.coordinate);
      saveLocation(fromOpenLayersCoordinate(event.coordinate));
    });

    mapService.map.on("moveend", () => {
      const extend = mapService.map.getView().calculateExtent(mapService.map.getSize());
      mapService.updateDeals(extend);
    });

    return mapService;
  }

  jumpToLocation(position: Position) {
    const center = toOpenLayersCoordinate(position);
    this.moveCircle(center);
  }

  async jumpToCurrentLocation() {
    const postion = await getLocation();
    const center = toOpenLayersCoordinate(postion);
    this.view.setCenter(center);
    this.moveCircle();
  }

  setRadius(radius: number) {
    this.circle.setRadius(this.transformRadius(radius));
    saveSearchRadius(radius);
  }

  setDeals(deals: ActiveDeal[]) {
    this.dealLayerSource.clear(true);
    deals.map((deal) => {
      const coordinate = deal.location?.coordinates;
      if (coordinate) {
        const icon = this.createIcon(deal, coordinate);
        this.dealLayerSource.addFeature(icon);
      }
    });
  }

  private async moveCircle(location?: Coordinate) {
    const _location = await getLocation();
    const center = toOpenLayersCoordinate(_location);
    const newCoordinates = location ? location : center;
    this.circle.setCenter(newCoordinates);
    this.centerPoint.setCenter(newCoordinates);
  }

  private transformRadius(radius: number) {
    // TODO transform correctly with OpenLayers methods
    // const projection = this.view.getProjection();
    // const pointResolution = getPointResolution(projection, 1, center);
    // const transformedRadius = radius / pointResolution;
    //
    // console.log("projection, pointResolution, transformedRadius = ", projection, pointResolution, transformedRadius);
    // console.log("units", projection.getUnits());

    return radius / 149500;
  }

  private createIcon(deal: ActiveDeal, coordinate: Coordinate): Feature {
    const feature = new Feature({
      geometry: new Point(coordinate)
    });

    const style = new Style({
      image: new Icon({
        src: getIconPathById(deal.category_id!),
        scale: 0.08
      })
    });

    feature.setStyle(style);

    return feature;
  }

  private saveCenter(coordinate: Coordinate) {
    const position = fromOpenLayersCoordinate(coordinate);
    saveLocation(position).then();
  }
}
