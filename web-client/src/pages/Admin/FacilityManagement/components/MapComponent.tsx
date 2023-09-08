import { memo } from "react";
// Services / API
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectAddMode,
  selectTempMarkerPos,
  setTempMarkerPos,
} from "../../../../store/slices/facilitySlice";
// Google Maps API
import { GOOGLE_MAP_API_KEY } from "../../../../api.config";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 14.860767193574064,
  lng: 120.81013409214616,
};

type TProps = {
  children: React.ReactNode;
  onSetMapHandler: (map: google.maps.Map) => void;
};

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const MapComponent = memo(({ children, onSetMapHandler }: TProps) => {
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });

  const dispatch = useAppDispatch();
  const addMode = useAppSelector(selectAddMode);
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);

  const onMapClickHandler = (event: google.maps.MapMouseEvent) => {
    if (!addMode) return;
    dispatch(
      setTempMarkerPos({ lat: event.latLng?.lat(), lng: event.latLng?.lng() })
    );
  };

  return (
    <>
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
          onLoad={(map) => {
            onSetMapHandler(map);
          }}
          onClick={onMapClickHandler}
        >
          {tempMarkerPos && addMode && (
            <MarkerF
              key={"Hello"}
              position={{
                lat: tempMarkerPos.lat ?? 0,
                lng: tempMarkerPos.lng ?? 0,
              }}
            />
          )}
          {children}
        </GoogleMap>
      )}
    </>
  );
});

export default MapComponent;
