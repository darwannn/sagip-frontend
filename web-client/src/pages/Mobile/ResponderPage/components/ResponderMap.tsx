import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { selectAssistanceReq } from "../../../../store/slices/assistanceReqSlice";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";

import { useGetOngoingAssistanceRequestsQuery } from "../../../../services/assistanceRequestQuery";

import my_location_icon from "../../../../assets/img/my_location_icon.png";

import { MarkerF } from "@react-google-maps/api";

import MapComponent from "../../../Admin/FacilityManagement/components/MapComponent";
import AssistanceDetails from "./AssistanceDetails";
import SearchLocation from "../../HazardMap/components/SearchLocation";
import CurrentLocation from "../../HazardMap/components/CurrentLocation";
import BottomSheet from "../../../../components/BottomSheet/BottomSheet";

import { BsArrowLeft } from "react-icons/bs";

const EmergencyReportsPage = () => {
  const dispatch = useAppDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const selectedAssistance = useAppSelector(selectAssistanceReq);
  const {
    data: requestData,
    isError: requestIsError,
    isLoading: requestIsLoading,
  } = useGetOngoingAssistanceRequestsQuery();

  useEffect(() => {
    if (selectedAssistance) {
      const { latitude, longitude } = selectedAssistance;
      map?.panTo({ lat: latitude, lng: longitude });
      console.log("selectedAssistance");
      console.log(selectedAssistance);
      setShowBottomSheet(true);
    }
  }, [selectedAssistance, map]);

  if (requestIsLoading) return <div>Loading...</div>;
  if (requestIsError) console.log("Error");

  return (
    <div className="relative h-screen">
      {selectedAssistance && (
        <>
          <BottomSheet
            showBottomSheet={showBottomSheet}
            setShowBottomSheet={setShowBottomSheet}
            snapPoints={[1000, 240, 0]}
            headerStyle={"bg-primary-50 rounded-t-3xl"}
            contentStyle={"bg-primary-50"}
            component={<>{selectedAssistance && <AssistanceDetails />}</>}
            isBackdropShown={false}
          />
        </>
      )}

      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={setMap}>
          <div className="w-full flex absolute top-3 px-5 gap-2 items-center">
            <Link to="/responder">
              <div className="bg-white rounded-full p-4 shadow-md">
                <BsArrowLeft />
              </div>
            </Link>
            <SearchLocation map={map} />
            <CurrentLocation map={map} />
          </div>

          {!requestIsLoading &&
            window.google &&
            requestData?.map((assistance) => (
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
                  console.log("assistance");
                  setShowBottomSheet(true);
                }}
              />
            ))}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
