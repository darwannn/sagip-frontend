import { useState } from "react";
import MapComponent from "../MapManagement/components/MapComponent";
const EmergencyReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={setMap}>
          {/* Child components, such as markers, info windows, etc. */}
        </MapComponent>
      </div>
    </div>
  );
};

export default EmergencyReportsPage;
