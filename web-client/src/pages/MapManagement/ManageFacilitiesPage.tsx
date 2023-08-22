import { useCallback, useState } from "react";
// Services / API
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetFacilitiesQuery } from "../../services/facilityQuery";
import {
  setSelectedFacility,
  selectAddMode,
  selectionFacility,
  selectTempMarkerPos,
} from "../../store/slices/facilitySlice";
// Functional Componenents
import { MarkerF } from "@react-google-maps/api";
import MapComponent from "./components/MapComponent";
import FacilityActions from "./components/FacilityActionBar";
import FacilitiesList from "./components/FacilitiesList";
import FacilityForm from "./components/FacilityForm";
import Select, { MultiValue } from "react-select";
// Types
import { TFacility } from "./types/emergencyFacility";

const ManageFacilitiesPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // Filter State
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  // Services / Redux
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

  // Set map state
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  // Pan map to specific location
  const panMapTo = (lat: number, lng: number) => {
    map?.panTo({
      lat,
      lng,
    });
  };
  // Recenter map to default
  const recenterMap = useCallback(() => {
    map?.panTo({
      lat: 14.860767193574064,
      lng: 120.81013409214616,
    });
  }, [map]);
  // Select facility on marker click
  const onClickMarkerHandler = useCallback(
    (facility: TFacility) => {
      dispatch(setSelectedFacility(facility));
      map?.panTo({
        lat: facility.latitude,
        lng: facility.longitude,
      });
    },

    [dispatch, map]
  );
  // Filter facilities base on states
  const filterdFacilities = () => {
    let filteredFacilities = facilities?.filter((facility) =>
      facility.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory.length > 0) {
      filteredFacilities = filteredFacilities?.filter((facility) =>
        selectedCategory.includes(facility.category.toLowerCase())
      );
    }

    return filteredFacilities;
  };

  const onSelectChange = (
    data: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setSelectedCategory(data.map((d) => d.value));
  };

  if (selectedFacility)
    panMapTo(selectedFacility.latitude, selectedFacility.longitude);

  if (isFacilitiesFetchError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col gap-2 p-2 w-max items-start">
        {/* Facility Actions */}
        <FacilityActions recenterMapHandler={recenterMap} />
        {/* Facilities List */}
        {isFacilitiesLoading ? (
          <p> Fetching facilities </p>
        ) : (
          <>
            <div className="flex flex-col p-3 gap-2 bg-gray-50 shadow-md rounded-md">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Search Facility"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                  placeholder="Filter by Category"
                  options={options}
                  onChange={onSelectChange}
                  isMulti={true}
                />
              </div>
              <FacilitiesList facilities={filterdFacilities() || []} />
            </div>
          </>
        )}
      </div>
      {/* IF ADD MODE, new facility form show */}
      {addMode && tempMarkerPos && <FacilityForm />}
      {/* IF SELECTED FACILITY, show facility form */}
      {selectedFacility && <FacilityForm facility={selectedFacility} />}
      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={onMapLoad}>
          {/* Child components, such as markers, info windows, etc. */}
          {!isFacilitiesLoading &&
            filterdFacilities()?.map((facility) => (
              <MarkerF
                key={facility._id}
                position={{
                  lat: facility.latitude,
                  lng: facility.longitude,
                }}
                onClick={() => onClickMarkerHandler(facility)}
              />
            ))}
        </MapComponent>
      </div>
    </div>
  );
};

export default ManageFacilitiesPage;

const options = [
  { value: "police station", label: "Police Station" },
  { value: "hospital", label: "Hospital" },
  { value: "fire station", label: "Fire Station" },
  { value: "evacuation center", label: "Evacuation Center" },
];
