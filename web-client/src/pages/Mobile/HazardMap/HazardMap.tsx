import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";

import { setSelectedHazardReport } from "../../../store/slices/hazardReportSlice";
import { setSelectedFacility } from "../../../store/slices/facilitySlice";

/* import { setSelectedAssistanceRequest } from "../../../store/slices/assistanceReqSlice";
import { useGetOngoingAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery"; */
import { useGetOngoingHazardQuery } from "../../../services/hazardReportsQuery";
import { useGetFacilitiesQuery } from "../../../services/facilityQuery";

import evacuation_icon from "../../../assets/img/evacuation_icon.png";
import hospital_icon from "../../../assets/img/hospital_icon.png";
import police_station_icon from "../../../assets/img/police_station_icon.png";
import my_location_icon from "../../../assets/img/my_location_icon.png";
import fire_station_icon from "../../../assets/img/fire_station_icon.png";
import hazard_icon from "../../../assets/img/hazard_icon.png";

import { MarkerF } from "@react-google-maps/api";

import MapComponent from "../../Admin/FacilityManagement/components/MapComponent";
import AssistanceDetails from "../ResponderPage/components/AssistanceDetails";
import HazardDetails from "./components/HazardDetails";
import FacilityDetails from "./components/FacilityDetails";
import SearchLocation from "./components/SearchLocation";
import CurrentLocation from "./components/CurrentLocation";
import ToggleFacilities from "./components/ToggleFacilities";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
/* import { receiveEvent } from "../../../util/socketIO";
import { getRoute } from "../../../util/route"; */
/* import ToggleMarkers from "./components/ToggleMarkers"; */

const EmergencyReportsPage = () => {
  const dispatch = useAppDispatch();
  const selectedHazard = useAppSelector(
    (state) => state.hazardReports.selectedHazard
  );
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  /* const [markerVisibility, setMarkerVisibility] = useState({
    assistance: true,
    hazard: true,
    facility: true,
  }); */
  const [facilityVisibility, setFacilityVisibility] = useState({
    evacuationArea: true,
    policeStation: true,
    fireStation: true,
    hospital: true,
  });

  const [selectedMarker, setselectedMarker] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const selectedAssistance = useAppSelector(selectAssistanceReq);
  /* const selectedFacility = useAppSelector(selectionFacility);
  const selectedHazard = useAppSelector(selectHazardReport); */
  /* const {
    data: requestData,
    isError: requestIsError,
    isLoading: requestIsLoading,
  } = useGetOngoingAssistanceRequestsQuery(); */
  const {
    data: hazardData,
    isError: hazardIsError,
    isLoading: hazardIsLoading,
  } = useGetOngoingHazardQuery();
  const {
    data: facilityData,
    isError: facilityIsError,
    isLoading: facilityIsLoading,
  } = useGetFacilitiesQuery();

  useEffect(() => {
    if (selectedHazard) {
      /* display selected hazard report from hazard feed */
      setShowBottomSheet(true);
      setselectedMarker(selectedHazard);
    }
  }, [selectedHazard]);

  useEffect(() => {
    if (selectedAssistance) {
      const { latitude, longitude } = selectedAssistance;
      map?.panTo({ lat: latitude, lng: longitude });
    }
  }, [selectedAssistance, map]);

  if (/* requestIsLoading || */ hazardIsLoading || facilityIsLoading)
    return <div>Loading...</div>;
  if (/* requestIsError || */ hazardIsError || facilityIsError)
    console.log("Error");

  /* receiveEvent("location", async (data) => {
    console.log("lcoation");
    console.log(data);
    if (data.content) {
      const responderLocation = await getRoute(
        `${data.content.latitude},${data.content.longitude}`,
        `14.847181109982058, 120.80829156110384`
      );
      console.log(responderLocation.distance);
    }
  }); */
  return (
    <div className="relative h-screen">
      <BottomSheet
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        snapPoints={
          [1000]
          /* selectedMarker === "assistance"
            ? [355, 240, 0]
            : selectedMarker === "hazard"
            ? [390, 0]
            : selectedMarker === "facility"
            ? [410, 0]
            : [0] */
        }
        headerStyle={
          /* selectedMarker === "assistance"
            ? "bg-primary-50 rounded-t-3xl"
            : */ selectedMarker === "hazard"
            ? "bg-white rounded-t-3xl"
            : selectedMarker === "facility"
            ? "bg-white rounded-t-3xl"
            : ""
        }
        contentStyle={
          /* selectedMarker === "assistance" ? "bg-primary-50" : */ "bg-white"
        }
        component={
          <>
            {selectedMarker === "assistance" && selectedAssistance && (
              <AssistanceDetails />
            )}
            {selectedMarker === "hazard" && <HazardDetails />}
            {selectedMarker === "facility" && <FacilityDetails />}
          </>
        }
        isBackdropShown={false}
      />

      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={setMap}>
          <div className="absolute top-3 w-full px-5">
            <div className="flex gap-2 items-center">
              <SearchLocation map={map} />
              <CurrentLocation map={map} />
            </div>

            {/* <ToggleMarkers
              markerVisibility={markerVisibility}
              setMarkerVisibility={setMarkerVisibility}
            /> */}
            <ToggleFacilities
              setFacilityVisibility={setFacilityVisibility}
              facilityVisibility={facilityVisibility}
            />
          </div>
          {/* {!requestIsLoading &&
            window.google &&
            requestData?.map(
              (assistance) =>
                markerVisibility.assistance && (
                  <MarkerF
                    key={assistance._id}
                    position={{
                      lat: assistance.latitude,
                      lng: assistance.longitude,
                    }}
                    icon={{
                      url: my_location_icon,
                      scaledSize: new window.google.maps.Size(50, 50),
                    }}
                    onClick={() => {
                      dispatch(setSelectedAssistanceRequest(assistance));
                      setselectedMarker("assistance");
                      setShowBottomSheet(true);
                    }}
                  />
                )
            )} */}
          {!hazardIsLoading &&
            window.google &&
            hazardData?.map((hazard) => (
              /*  markerVisibility.hazard && */ <MarkerF
                key={hazard._id}
                position={{
                  lat: hazard.latitude,
                  lng: hazard.longitude,
                }}
                icon={{
                  url: hazard_icon,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                onClick={() => {
                  dispatch(setSelectedHazardReport(hazard));
                  setselectedMarker("hazard");
                  setShowBottomSheet(true);
                }}
              />
            ))}
          {!facilityIsLoading &&
            window.google &&
            facilityData?.map((facility) => {
              const isVisible =
                /* markerVisibility.facility && */
                (
                  facility.category === "Hospital"
                    ? facilityVisibility.hospital
                    : facility.category === "Evacuation Area"
                    ? facilityVisibility.evacuationArea
                    : facility.category === "Police Station"
                    ? facilityVisibility.policeStation
                    : facility.category === "Fire Station"
                    ? facilityVisibility.fireStation
                    : ""
                ) as keyof typeof facilityVisibility;

              return (
                isVisible && (
                  <MarkerF
                    key={facility._id}
                    position={{
                      lat: facility.latitude,
                      lng: facility.longitude,
                    }}
                    icon={{
                      url:
                        facility.category === "Evacuation Area"
                          ? evacuation_icon
                          : facility.category === "Police Station"
                          ? police_station_icon
                          : facility.category === "Fire Station"
                          ? fire_station_icon
                          : facility.category === "Hospital"
                          ? hospital_icon
                          : my_location_icon,
                      scaledSize: new window.google.maps.Size(50, 50),
                    }}
                    onClick={() => {
                      dispatch(setSelectedFacility(facility));
                      setselectedMarker("facility");
                      setShowBottomSheet(true);
                    }}
                  />
                )
              );
            })}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
