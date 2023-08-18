import { useEffect, useState } from "react";
import MapComponent from "../MapManagement/components/MapComponent";
import { useGetAllAssistanceRequestsQuery } from "../../services/assistanceRequestQuery";
import AssistanceList from "./components/AssistanceList";
import { MarkerF } from "@react-google-maps/api";
import AssistanceDetails from "./components/AssistanceDetails";
import { useAppSelector } from "../../store/hooks";
import { selectAssistanceReq } from "../../store/slices/assistanceReqSlice";
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
  // if (isSuccess) console.log(data);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex w-max items-start p-2">
        <AssistanceList />
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
