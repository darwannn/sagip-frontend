import { memo } from "react";
import { MarkerF } from "@react-google-maps/api";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";

interface EmergenyMarkerProps {
  assistanceData: TAssistanceRequest;
}

// Custom Markers
import fireMarker from "../../../../assets/img/markers/assistance_request/Fire.png";
// import trappedMarker from "../../../../assets/img/markers/assistance_request/Trap.png";
// import medicalMarker from "../../../../assets/img/markers/assistance_request/Injury.png";

const EmergenyMarker: React.FC<EmergenyMarkerProps> = memo(
  ({ assistanceData }) => {
    return (
      <MarkerF
        key={assistanceData._id}
        position={{
          lat: assistanceData.latitude,
          lng: assistanceData.longitude,
        }}
        icon={{
          url: fireMarker,
          scaledSize: new google.maps.Size(50, 50),
        }}
      >
        {/* <InfoWindowF
                  position={{
                    lat: assistance.latitude,
                    lng: assistance.longitude,
                  }}
                >
                  {filter === "" ? (
                    <div className="m-2">
                      <p className="font-semibold">{assistance._id}</p>
                    </div>
                  ) : (
                    <div className="border-l-2 border-l-red-500 p-2">
                      <div>
                        <span className="text-gray-500">{assistance._id}</span>
                      </div>
                      <div className="text-sm font-semibold">
                        <p>{formatAsstReqDate(assistance.createdAt)}</p>
                      </div>
                    </div>
                  )}
                </InfoWindowF> */}
      </MarkerF>
    );
  }
);

export default EmergenyMarker;
