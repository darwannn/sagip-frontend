import { memo } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";

interface EmergenyMarkerProps {
  assistanceData: TAssistanceRequest;
}
import { useAppSelector } from "../../../../store/hooks";
import { selectAssistanceReq } from "../../../../store/slices/assistanceReqSlice";
import { formatAsstReqDate } from "../../../../util/date";

// Custom Markers
// import fireMarker from "../../../../assets/img/markers/assistance_request/Fire.png";
import trappedMarker from "../../../../assets/img/markers/assistance_request/Trap.png";
// import medicalMarker from "../../../../assets/img/markers/assistance_request/Injury.png";

const EmergenyMarker: React.FC<EmergenyMarkerProps> = memo(
  ({ assistanceData }) => {
    const selectedAssistance = useAppSelector(selectAssistanceReq);
    const isSelected = selectedAssistance?._id === assistanceData._id;
    return (
      <MarkerF
        key={assistanceData._id}
        position={{
          lat: assistanceData.latitude,
          lng: assistanceData.longitude,
        }}
        icon={{
          url: trappedMarker,
          scaledSize: new google.maps.Size(50, 50),
        }}
      >
        {isSelected && (
          <InfoWindowF
            position={{
              lat: assistanceData.latitude,
              lng: assistanceData.longitude,
            }}
          >
            <div className="border-l-2 border-l-red-500 p-2">
              <div>
                <span className="text-gray-500">{assistanceData._id}</span>
              </div>
              <div className="text-sm font-semibold">
                <p>{formatAsstReqDate(assistanceData.createdAt)}</p>
              </div>
            </div>
          </InfoWindowF>
        )}
        {/*  */}
      </MarkerF>
    );
  }
);

export default EmergenyMarker;
