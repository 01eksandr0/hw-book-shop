import type { ComponentType, PropsWithChildren } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroupRaw from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

/** CJS-пакет у Vite часто дає `{ default: FC }` — без цього React бачить «object» замість компонента. */
const MarkerClusterGroup = (
  (MarkerClusterGroupRaw as unknown as { default?: ComponentType<PropsWithChildren> }).default ??
  MarkerClusterGroupRaw
) as ComponentType<
  PropsWithChildren<{
    chunkedLoading?: boolean;
    disableClusteringAtZoom?: number | null;
    maxClusterRadius?: number;
    showCoverageOnHover?: boolean;
    spiderfyOnEveryZoom?: boolean;
    spiderfyOnMaxZoom?: boolean;
  }>
>;
import { STORE_LOCATIONS } from "@/data/storeLocations";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.mergeOptions({ icon: defaultIcon });

const UKRAINE_CENTER: L.LatLngExpression = [48.45, 31.05];
const DEFAULT_ZOOM = 6;

export default function StoresMap() {
  return (
    <MapContainer
      aria-label="Інтерактивна карта магазинів Читаріум"
      center={UKRAINE_CENTER}
      className="z-0 h-[min(58vh,480px)] w-full min-h-[300px] rounded-[inherit] sm:h-[min(62vh,520px)]"
      scrollWheelZoom
      zoom={DEFAULT_ZOOM}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        disableClusteringAtZoom={16}
        maxClusterRadius={68}
        showCoverageOnHover={false}
        spiderfyOnEveryZoom={false}
        spiderfyOnMaxZoom
      >
        {STORE_LOCATIONS.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]}>
            <Popup>
              <div className="min-w-[10rem] text-sm leading-snug text-[#1a1a1a]">
                <div className="font-bold">«Читаріум»</div>
                <div className="mt-0.5 text-[0.8125rem] text-neutral-600">{store.cityName}</div>
                <div className="mt-1.5 text-[0.8125rem]">{store.addressLine}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
