import { useEffect, useState } from "react";
import MapComponent from "../MapManagement/components/MapComponent";
import { useGetAllAssistanceRequestsQuery } from "../../services/assistanceRequestQuery";
import AssistanceList from "./components/AssistanceList";
import { MarkerF } from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";
import AssistanceDetails from "./components/AssistanceDetails";
const EmergencyReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchParams] = useSearchParams();
  const emergencyId = searchParams.get("emergencyId");
  const { data, isError, isLoading, isSuccess, error } =
    useGetAllAssistanceRequestsQuery();

  useEffect(() => {
    if (map && emergencyId) {
      const assistance = data?.find((a) => a._id === emergencyId);
      if (assistance) {
        map.panTo({
          lat: assistance.latitude,
          lng: assistance.longitude,
        });
      } else {
        console.log("Assistance not found");
      }
    }
    return () => {
      // clear the search params
      searchParams.delete("emergencyId");
    };
  }, [map, emergencyId, data, searchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) console.log(error);
  // if (isSuccess) console.log(data);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex w-max items-start p-2">
        <AssistanceList />
      </div>
      {emergencyId && <AssistanceDetails />}
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
