import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../../api.config";

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
  return (
    <>
      <h1>Manage Map Page</h1>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default ManageMapPage;
