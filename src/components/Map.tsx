"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Add back the missing constant
const TRINITY_SITE_COORDS: L.LatLngExpression = [33.6777, -106.475]; // Latitude, Longitude

interface SiteInfo {
  name: string;
  description: string;
}

export default function Map() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteInfo | null>(null);

  console.log("isSheetOpen", isSheetOpen);

  // Define the icon inside the component using useMemo and public paths
  const defaultIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/leaflet/images/marker-icon.png",
        iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
        shadowUrl: "/leaflet/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  const handleMarkerClick = (siteInfo: SiteInfo) => {
    setSelectedSite(siteInfo);
    setIsSheetOpen(true);
  };

  const trinitySiteInfo: SiteInfo = {
    name: "Trinity Site",
    description:
      "Location of the first detonation of a nuclear weapon on July 16, 1945. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <>
      <MapContainer
        center={TRINITY_SITE_COORDS}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }} // Ensure map takes full screen
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer
          attribution="Tiles &copy; Esri, HERE, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker
          position={TRINITY_SITE_COORDS}
          icon={defaultIcon}
          eventHandlers={{
            click: () => {
              handleMarkerClick(trinitySiteInfo);
            },
          }}
        >
          {/* Optional: Basic popup directly on marker */}
          {/* <Popup>
            Trinity Site <br /> Click for more info.
          </Popup> */}
        </Marker>
      </MapContainer>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={false}>
        <SheetContent
          side="left"
          className="w-[400px] sm:w-[540px] overflow-y-auto z-[9999]"
        >
          {selectedSite && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedSite.name}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <SheetDescription>
                  {selectedSite.description}
                  {/* Add more detailed info here */}
                </SheetDescription>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
