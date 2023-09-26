import { useEffect, useState } from "react";
import MapComponent from "../FacilityManagement/components/MapComponent";
import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import AssistanceList from "./components/AssistanceList";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import AssistanceDetails from "./components/AssistanceDetails";
import { useAppSelector } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";
import AssistanceFilters from "./components/AssistanceFilter";
import { TAssistanceRequest } from "../../../types/assistanceRequest";
import { useSearchParams } from "react-router-dom";
const EmergencyReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const selectedAssistance = useAppSelector(selectAssistanceReq);
  const { data, isError, isLoading, error } =
    useGetAllAssistanceRequestsQuery();
  const [filtered, setFiltered] = useState<TAssistanceRequest[]>([]);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";

  useEffect(() => {
    if (data) {
      const filteredAssistance = data?.filter((item) => {
        // Filter based on `filter` else return all
        if (filter) {
          return item.status === filter;
        }
        return true;
      });

      setFiltered(filteredAssistance);
    }
  }, [filter, data]);

  useEffect(() => {
    if (selectedAssistance) {
      const { latitude, longitude } = selectedAssistance;
      map?.panTo({ lat: latitude, lng: longitude });
    }
  }, [selectedAssistance, map]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) console.log(error);

  return (
    <div className="relative flex flex-row bg-white-100">
      <div className="flex flex-col gap-5 py-10 px-5 w-[400px] border-r bg-gray-50 max-h-screen overflow-hidden">
        {/* Header */}
        <div className="">
          <h1 className="text-xl font-bold">Emergency Reports</h1>
        </div>
        <AssistanceFilters />
        <AssistanceList assistanceRequests={filtered} />
        {/* <div className="relative z-[5] flex flex-col w-max items-start bg-white p-3 max-h-[70vh] min-w-[350px] shadow border rounded-md ">
        </div> */}
      </div>
      {selectedAssistance && <AssistanceDetails />}
      <div className="flex-1">
        <MapComponent onSetMapHandler={setMap}>
          {/* Child components, such as markers, info windows, etc. */}
          {!isLoading &&
            filtered?.map((assistance) => (
              <MarkerF
                key={assistance._id}
                position={{
                  lat: assistance.latitude,
                  lng: assistance.longitude,
                }}
              >
                <InfoWindowF
                  position={{
                    lat: assistance.latitude,
                    lng: assistance.longitude,
                  }}
                >
                  <div className="m-2">
                    <p className="font-semibold">{assistance._id}</p>
                  </div>
                </InfoWindowF>
              </MarkerF>
            ))}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
