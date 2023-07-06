import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../../api.config";
// import { lightMapTheme } from "./mapStyle";
import { useState } from "react";
import FacilityForm from "./components/FacilityForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FacilitiesList from "./components/FacilitiesList";
import {
  useAddFacilityMutation,
  useDeleteFacilityMutation,
  useGetFacilitiesQuery,
  useUpdateFacilityMutation,
} from "../../services/facilityQuery";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setSelectedFacility,
  unsetSelectedFacility,
  selectionFacility,
} from "../../store/slices/facilitySlice";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};
// ,
const center = {
  lat: 14.860767193574064,
  lng: 120.81013409214616,
};

const ManageMapPage = () => {
  // const [facilities, setFacilities] = useState<TFacility[]>([]);
  // const [selectedFacility, setSelectedFacility] = useState<TFacility | null>(
  //   null
  // );

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [addMode, setAddMode] = useState<boolean>(false);
  const [tempMarker, setTempMarker] = useState<{
    lat: number | undefined;
    lang: number | undefined;
  } | null>(null);

  const dispatch = useAppDispatch();
  const selectedFacility = useAppSelector(selectionFacility);

  const [
    addFacility,
    {
      isError: isAddFacilityError,
      isLoading: isAddFacilityLoading,
      isSuccess: isAddFacilitySuccess,
      error: addFacilityError,
    },
  ] = useAddFacilityMutation();
  const [updateFacility, updateFacilityState] = useUpdateFacilityMutation();
  const [deleteFacility, deleteFacilityState] = useDeleteFacilityMutation();
  // Get all the facilities
  const {
    data: facilities,
    isLoading: isFacilitiesLoading,
    error: isFacilitiesFetchError,
  } = useGetFacilitiesQuery(undefined);

  if (isFacilitiesFetchError) {
    return <p>Something went wrong...</p>;
  }

  // Adding facility error handling
  if (isAddFacilityLoading) console.log("Loading...");
  if (isAddFacilityError) console.log(addFacilityError);
  if (isAddFacilitySuccess) {
    setAddMode(false);
    setTempMarker(null);
  }

  // Updating facility error handling
  if (updateFacilityState.isLoading) console.log("Loading...");
  if (updateFacilityState.isError) console.log(updateFacilityState.error);

  // Deleting facility error handling
  if (deleteFacilityState.isLoading) console.log("Loading...");
  if (deleteFacilityState.isError) console.log(deleteFacilityState.error);

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
    addFacility({ body });
  };

  const onUpdateFacilityHandler: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedFacility) return;

    const body = new FormData();
    data.image && body.append("image", data.image[0]);
    body.append("name", data.name);
    body.append("latitude", data.latitude);
    body.append("longitude", data.longitude);
    body.append("contactNumber", data.contact);
    body.append("category", data.category);
    body.append("status", data.status);
    body.append("hasChanged", "true");

    updateFacility({ body, id: selectedFacility._id });
  };

  const onDeleteFacilityHandler = async (facilityId: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    deleteFacility({ id: facilityId });
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
                setAddMode(!addMode);
                setTempMarker(null);
                // if (selectedFacility) setSelectedFacility(null);
              }}
            >
              {addMode ? "Cancel" : "Add"}
            </button>
          </div>

          {/* Facilities List */}
          {isFacilitiesLoading ? (
            <p> Fetching facilities </p>
          ) : (
            <FacilitiesList
              facilities={facilities || []}
              onDeleteFacilityHandler={onDeleteFacilityHandler}
            />
          )}
        </div>
        {/* IF ADD MODE, new facility form show */}
        {addMode && tempMarker && (
          <FacilityForm
            lat={tempMarker.lat || 0}
            lng={tempMarker.lang || 0}
            onSubmit={onSubmitMapHandler}
          />
        )}
        {/* IF SELECTED FACILITY, show facility form */}
        {selectedFacility && (
          <FacilityForm
            lat={selectedFacility.latitude}
            lng={selectedFacility.longitude}
            onSubmit={onUpdateFacilityHandler}
            facility={selectedFacility}
          />
        )}
      </div>
      {isMapLoaded && (
        <div className="absolute top-0 z-0">
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
            {tempMarker && addMode && (
              <MarkerF
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
