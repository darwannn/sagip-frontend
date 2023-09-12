import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { selectAssistanceReq } from "../../../../store/slices/assistanceReqSlice";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";

import { useGetOngoingAssistanceRequestsQuery } from "../../../../services/assistanceRequestQuery";

import my_location_icon from "../../../../assets/img/my_location_icon.png";

import { MarkerF } from "@react-google-maps/api";
import Sheet, { SheetRef } from "react-modal-sheet";

import MapComponent from "../../../Admin/FacilityManagement/components/MapComponent";
import AssistanceDetails from "./AssistanceDetails";
import SearchLocation from "../../HazardMap/components/SearchLocation";
import CurrentLocation from "../../HazardMap/components/CurrentLocation";

import { BsArrowLeft } from "react-icons/bs";

const EmergencyReportsPage = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(false);

  const sheetRef = useRef<SheetRef>();
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
      setOpen(true);
    }
  }, [selectedAssistance, map]);

  if (requestIsLoading) return <div>Loading...</div>;
  if (requestIsError) console.log("Error");

  return (
    <div className="relative h-screen">
      {selectedAssistance && (
        <>
          <Sheet
            ref={sheetRef}
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            snapPoints={[360, 240, 0]}
            initialSnap={0}
            onSnap={(snapIndex: number) =>
              console.log("> Current snap point index:", snapIndex)
            }
          >
            <Sheet.Container
              style={{
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px",
              }}
            >
              <Sheet.Header className="bg-primary-50 rounded-t-3xl" />

              <Sheet.Content className="bg-primary-50">
                {selectedAssistance && <AssistanceDetails />}
              </Sheet.Content>
            </Sheet.Container>
            {/* <Sheet.Backdrop /> */}
          </Sheet>
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

                  setOpen(true);
                  //snapTo(2);
                }}
              />
            ))}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
