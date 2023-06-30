import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../../api.config";
import { lightMapTheme } from "./mapStyle";
import { useEffect } from "react";

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
  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await fetch(`${API_BASE_URL}/emergency-facility/`);
      const data = await response.json();
      console.log(data);
    };

    fetchFacilities();
  }, []);

  return (
    <>
      <h1>Manage Map Page</h1>
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
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default ManageMapPage;
