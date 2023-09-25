import { useEffect, useState } from "react";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import type { Token } from "../../../../types/auth";

import { receiveEvent } from "../../../../util/socketIO";
import { getRoute } from "../../../../util/route";

import ResponderDetails from "./ResponderDetails";
import { MarkerF } from "@react-google-maps/api";

import jwtDecode from "jwt-decode";

import MapComponent from "../../../Admin/FacilityManagement/components/MapComponent";
import BottomSheet from "../../../../components/BottomSheet/BottomSheet";

import responder_marker from "../../../../assets/img/responder.png";
import { BiCurrentLocation } from "react-icons/bi";

type TProps = {
  myAssistanceRequest: TAssistanceRequest;
};
const AssistanceMap = ({ myAssistanceRequest }: TProps) => {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [responderDistance, setResponderDistance] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  /* const [isFollowingResponder, setIsFollowingResponder] =
    useState<boolean>(false); */
  const [responderLocation, setResponderLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const decodedToken = jwtDecode<Token>(localStorage.getItem("token") || "");

  useEffect(() => {
    receiveEvent("location", async (data) => {
      if (data.receiver === decodedToken.id) {
        if (data.content) {
          const latitude: number | undefined = data.content?.latitude;
          const longitude: number | undefined = data.content?.longitude;

          if (latitude && longitude) {
            console.log(data);
            const responderLocation = await getRoute(
              `${latitude},${longitude}`,
              `14.847181109982058,120.80829156110384`
            );
            setResponderDistance(responderLocation.distance);
            setEstimatedTime(responderLocation.estimatedTime);
            console.log(responderLocation.distance);
            setResponderLocation({ latitude, longitude });

            /* if (isFollowingResponder) {
            map?.panTo({ lat: latitude, lng: longitude });
          } */
          }
        }
      }
    });
  });

  return (
    <div className="relative h-screen">
      <BottomSheet
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        snapPoints={[1000]}
        headerStyle={"bg-white rounded-t-3xl"}
        contentStyle={"bg-white"}
        component={
          <ResponderDetails
            myAssistanceRequest={myAssistanceRequest}
            responderDistance={responderDistance}
            estimatedTime={estimatedTime}

            /* isFollowingResponder={isFollowingResponder}
            setIsFollowingResponder={setIsFollowingResponder} */
          />
        }
        isBackdropShown={false}
      />
      <div className="absolute top-0 z-0 w-full">
        <MapComponent onSetMapHandler={setMap}>
          {" "}
          {responderLocation.latitude != 0 &&
            responderLocation.longitude != 0 && (
              <>
                {/* recenter to responders location */}
                <div className="absolute top-3 right-0 px-5">
                  <div
                    className="text-gray-600 bg-white p-3 rounded-lg shadow-md m-auto hover:bg-primary-600 hover:text-white cursor-pointer"
                    onClick={() => {
                      map?.panTo({
                        lat: responderLocation.latitude,
                        lng: responderLocation.longitude,
                      });
                    }}
                  >
                    <BiCurrentLocation className=" text-2xl" />
                  </div>
                </div>
                <MarkerF
                  position={{
                    lat: responderLocation.latitude,
                    lng: responderLocation.longitude,
                  }}
                  icon={{
                    url: responder_marker,
                    scaledSize: new window.google.maps.Size(75, 75),
                  }}
                  onClick={() => setShowBottomSheet(true)}
                />
              </>
            )}
        </MapComponent>
      </div>
    </div>
  );
};

export default AssistanceMap;
