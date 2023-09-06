import { useEffect, useState } from "react";
import MapComponent from "../FacilityManagement/components/MapComponent";
import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import AssistanceList from "./components/AssistanceList";
import { MarkerF } from "@react-google-maps/api";
import AssistanceDetails from "./components/AssistanceDetails";
import { useAppSelector } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";
import AssistanceFilters from "./components/AssistanceFilter";
const EmergencyReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const selectedAssistance = useAppSelector(selectAssistanceReq);
  const { data, isError, isLoading, error } =
    useGetAllAssistanceRequestsQuery();

  useEffect(() => {
    if (selectedAssistance) {
      const { latitude, longitude } = selectedAssistance;
      map?.panTo({ lat: latitude, lng: longitude });
    }
  }, [selectedAssistance, map]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) console.log(error);

  return (
    <div className="relative h-screen">
      <div className="flex flex-col p-2">
        <div className="relative z-[5] flex flex-col w-max items-start bg-white p-3 max-h-[70vh] min-w-[350px] shadow border rounded-md ">
          <AssistanceFilters />
          <AssistanceList />
        </div>
      </div>
      {selectedAssistance && <AssistanceDetails />}
      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={setMap}>
          {/* Child components, such as markers, info windows, etc. */}
          {!isLoading &&
            data?.map((assistance) => (
              <MarkerF
                key={assistance._id}
                position={{
                  lat: assistance.latitude,
                  lng: assistance.longitude,
                }}
              />
            ))}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
