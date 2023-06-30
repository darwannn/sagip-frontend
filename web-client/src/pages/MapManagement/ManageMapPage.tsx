import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../../api.config";
import { lightMapTheme } from "./mapStyle";
import { useEffect, useState } from "react";
import type { TFacility } from "./Types/emergencyFacility";

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
    <>
      <h1>Manage Map Page</h1>
      {isLoading && <p>Loading map details...</p>}
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            styles: lightMapTheme,
            minZoom: 13,
            maxZoom: 16,
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
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default ManageMapPage;
