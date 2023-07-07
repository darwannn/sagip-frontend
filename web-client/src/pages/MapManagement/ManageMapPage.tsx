import {
  GoogleMap,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../../api.config";
// import { lightMapTheme } from "./mapStyle";
import { useState } from "react";
import FacilityForm from "./components/FacilityForm";
import FacilitiesList from "./components/FacilitiesList";
import { useGetFacilitiesQuery } from "../../services/facilityQuery";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setSelectedFacility,
  unsetSelectedFacility,
  setAddMode,
  selectAddMode,
  selectionFacility,
  setTempMarkerPos,
  selectTempMarkerPos,
} from "../../store/slices/facilitySlice";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
// ,
const center = {
  lat: 14.860767193574064,
  lng: 120.81013409214616,
};

const ManageMapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const dispatch = useAppDispatch();
  const selectedFacility = useAppSelector(selectionFacility);
  const addMode = useAppSelector(selectAddMode);
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);

  // Get all the facilities
  const {
    data: facilities,
    isLoading: isFacilitiesLoading,
    error: isFacilitiesFetchError,
  } = useGetFacilitiesQuery(undefined);

  if (isFacilitiesFetchError) {
    return <p>Something went wrong...</p>;
  }

  const onMapClickHandler = (event: google.maps.MapMouseEvent) => {
    if (!addMode || !map) return;
    dispatch(
      setTempMarkerPos({ lat: event.latLng?.lat(), lng: event.latLng?.lng() })
    );
  };

  const panMapTo = (lat: number, lng: number) => {
    map?.panTo({
      lat,
      lng,
    });
  };

  if (selectedFacility)
    panMapTo(selectedFacility.latitude, selectedFacility.longitude);

  return (
    <div className="relative h-screen">
      <h1>Manage Map Page</h1>
      {isFacilitiesLoading && <p>Loading map details...</p>}
      <div className="relative z-10 flex flex-row gap-2 w-max">
        <div className="flex flex-col z-10 bg-white p-2 gap-2">
          {/* ACTIONS */}
          <div className="">
            {selectedFacility && (
              <button
                className="bg-red-500 p-2"
                onClick={() => dispatch(unsetSelectedFacility())}
              >
                Close
              </button>
            )}
            <button
              className={`${addMode ? "bg-red-200" : "bg-green-500"} p-2`}
              onClick={() => {
                dispatch(setAddMode(!addMode));
              }}
            >
              {addMode ? "Cancel" : "Add"}
            </button>
          </div>

          {/* Facilities List */}
          {isFacilitiesLoading ? (
            <p> Fetching facilities </p>
          ) : (
            <FacilitiesList facilities={facilities || []} />
          )}
        </div>
        {/* IF ADD MODE, new facility form show */}
        {addMode && tempMarkerPos && <FacilityForm />}
        {/* IF SELECTED FACILITY, show facility form */}
        {selectedFacility && <FacilityForm facility={selectedFacility} />}
      </div>
      {isMapLoaded && (
        <div className="absolute top-0 z-0 w-full">
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
            {!isFacilitiesLoading &&
              facilities?.map((facility) => (
                <MarkerF
                  key={facility._id}
                  position={{
                    lat: facility.latitude,
                    lng: facility.longitude,
                  }}
                  onClick={() => {
                    dispatch(setSelectedFacility(facility));
                    map?.panTo({
                      lat: facility.latitude,
                      lng: facility.longitude,
                    });
                  }}
                />
              ))}
            {tempMarkerPos && addMode && (
              <Marker
                key={"Hello"}
                position={{
                  lat: tempMarkerPos.lat ?? 0,
                  lng: tempMarkerPos.lng ?? 0,
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
