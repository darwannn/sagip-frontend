import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../../api.config";
import { lightMapTheme } from "./mapStyle";
import { useEffect, useState } from "react";
import type { TFacility } from "./types/emergencyFacility";

const containerStyle = {
  width: "100vw",
  height: "700px",
};
// ,
const center = {
  lat: 14.860767193574064,
  lng: 120.81013409214616,
};

const ManageMapPage = () => {
  const [facilities, setFacilities] = useState<TFacility[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchFacilities = async () => {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/emergency-facility/`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      }
      console.log(data);
      setFacilities(data);
      setIsLoading(false);
    };

    fetchFacilities();
  }, []);

  return (
    <div className="relative">
      <h1>Manage Map Page</h1>
      {isLoading && <p>Loading map details...</p>}
      <div className="flex flex-col w-1/6 relative z-10 bg-white p-2 gap-2">
        {facilities.length != 0 &&
          !isLoading &&
          facilities.map((facility) => (
            <div
              key={facility._id}
              className="border p-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                map?.panTo({ lat: facility.latitude, lng: facility.longitude });
              }}
            >
              <p>{facility.name}</p>
              <p>{facility.contactNumber}</p>
              <p>{facility.latitude}</p>
              <p>{facility.longitude}</p>
            </div>
          ))}
      </div>
      {isMapLoaded && (
        <div className="absolute top-0 left-0 z-0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              styles: lightMapTheme,
              minZoom: 13,
              maxZoom: 16,
              zoomControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
            }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {facilities.map((facility) => (
              <Marker
                key={facility._id}
                position={{
                  lat: facility.latitude,
                  lng: facility.longitude,
                }}
                onClick={() => {
                  map?.panTo({
                    lat: facility.latitude,
                    lng: facility.longitude,
                  });
                }}
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default ManageMapPage;
