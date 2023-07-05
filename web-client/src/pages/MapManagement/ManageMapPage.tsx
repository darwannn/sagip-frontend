import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../../api.config";
// import { lightMapTheme } from "./mapStyle";
import { useEffect, useState } from "react";
import type { TFacility } from "./types/emergencyFacility";
import MapForm from "./components/MapForm";
import { FieldValues, SubmitHandler, set } from "react-hook-form";
import FacilitiesList from "./components/FacilitiesList";

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
  const [selectedFacility, setSelectedFacility] = useState<TFacility | null>(
    null
  );

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addMode, setAddMode] = useState<boolean>(false);
  const [tempMarker, setTempMarker] = useState<{
    lat: number | undefined;
    lang: number | undefined;
  } | null>(null);

  // Get all the facilities
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

  const onMapClickHandler = (event: google.maps.MapMouseEvent) => {
    if (!addMode || !map) return;
    setTempMarker({
      lat: event.latLng?.lat(),
      lang: event.latLng?.lng(),
    });
  };

  const onSubmitMapHandler: SubmitHandler<FieldValues> = async (data) => {
    if (!tempMarker) return;
    console.log(data);

    const body = new FormData();
    body.append("image", data.image[0]);
    body.append("name", data.name);
    body.append("latitude", data.latitude);
    body.append("longitude", data.longitude);
    body.append("contactNumber", data.contact);
    body.append("category", data.category);
    body.append("status", data.status);
    body.append("hasChanged", "false");

    const response = await fetch(`${API_BASE_URL}/emergency-facility/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body,
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      return;
    }
    console.log(responseData);
    setFacilities((prev) => [...prev, responseData.emergencyFacility]);
    setAddMode(false);
    setTempMarker(null);
  };

  const onDeleteFacilityHandler = async (facilityId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/emergency-facility/delete/${facilityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      return;
    }
    setFacilities((prev) => prev.filter((f) => f._id !== facilityId));
  };

  const panMapTo = (lat: number, lng: number) => {
    map?.panTo({
      lat,
      lng,
    });
  };

  const selectFacility = (facility: TFacility) => {
    setSelectedFacility(facility);
    panMapTo(facility.latitude, facility.longitude);
  };

  return (
    <div className="relative">
      <h1>Manage Map Page</h1>
      {isLoading && <p>Loading map details...</p>}
      <div className="flex flex-col w-1/4 relative z-10 bg-white p-2 gap-2">
        {/* ACTIONS */}
        <div className="">
          <button
            className={`${addMode ? "bg-red-200" : "bg-green-500"} p-2`}
            onClick={() => {
              setAddMode(!addMode);
              setTempMarker(null);
            }}
          >
            {addMode ? "Cancel" : "Add"}
          </button>
        </div>
        {/* IF ADD MODE, new facility form show */}
        {addMode && tempMarker && (
          <MapForm
            lat={tempMarker.lat || 0}
            lng={tempMarker.lang || 0}
            onSubmit={onSubmitMapHandler}
          />
        )}
        {/* Facilities List */}
        {isLoading ? (
          <p> Fetching facilities </p>
        ) : (
          <FacilitiesList
            facilities={facilities}
            selectFacilityHandler={selectFacility}
            onDeleteFacilityHandler={onDeleteFacilityHandler}
          />
        )}
      </div>
      {isMapLoaded && (
        <div className="absolute top-0 left-0 z-0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              mapId: "ca99ebef66d0dc2e",
              // styles: lightMapTheme,
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
            onClick={(event) => onMapClickHandler(event)}
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
            {tempMarker && addMode && (
              <Marker
                key={"Hello"}
                position={{
                  lat: tempMarker.lat ?? 0,
                  lng: tempMarker.lang ?? 0,
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default ManageMapPage;
