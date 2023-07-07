import { MarkerF } from "@react-google-maps/api";
import FacilityForm from "./components/FacilityForm";
import FacilitiesList from "./components/FacilitiesList";
import { useGetFacilitiesQuery } from "../../services/facilityQuery";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setSelectedFacility,
  selectAddMode,
  selectionFacility,
  selectTempMarkerPos,
} from "../../store/slices/facilitySlice";
import MapComponent from "./components/MapComponent";
import { useState } from "react";
import FacilityActions from "./components/FacilityActionBar";

const ManageMapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

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
  // Set map state
  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
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
      {isFacilitiesLoading && <p>Loading map details...</p>}
      <div className="relative z-10 flex flex-col gap-2 p-2 w-max items-start">
        {/* Facility Actions */}
        <FacilityActions />
        {/* Facilities List */}
        {isFacilitiesLoading ? (
          <p> Fetching facilities </p>
        ) : (
          <FacilitiesList facilities={facilities || []} />
        )}
        {/* IF ADD MODE, new facility form show */}
        {addMode && tempMarkerPos && <FacilityForm />}
        {/* IF SELECTED FACILITY, show facility form */}
        {selectedFacility && <FacilityForm facility={selectedFacility} />}
      </div>
      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={onMapLoad}>
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
        </MapComponent>
      </div>
    </div>
  );
};

export default ManageMapPage;
