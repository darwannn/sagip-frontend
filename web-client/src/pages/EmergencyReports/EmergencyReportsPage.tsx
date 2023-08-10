import { useState } from "react";
import MapComponent from "../MapManagement/components/MapComponent";
import { useGetAllAssistanceRequestsQuery } from "../../services/assistanceRequestQuery";
import AssistanceList from "./components/AssistanceList";
import { MarkerF } from "@react-google-maps/api";
const EmergencyReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllAssistanceRequestsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) console.log(error);
  if (isSuccess) console.log(data);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex w-max items-start p-2">
        <AssistanceList />
      </div>
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
