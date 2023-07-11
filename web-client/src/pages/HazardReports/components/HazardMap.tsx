import { memo } from "react";
// Google Maps API
import { GOOGLE_MAP_API_KEY } from "../../../api.config";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 14.860767193574064,
  lng: 120.81013409214616,
};

type TProps = {
  children?: React.ReactNode;
};

const HazardMap = memo(({ children }: TProps) => {
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  return (
    <div className="absolute top-0 z-0 w-full">
      {isMapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            mapId: "ca99ebef66d0dc2e",
            minZoom: 13,
            maxZoom: 16,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          {children}
        </GoogleMap>
      )}
    </div>
  );
});

export default HazardMap;
