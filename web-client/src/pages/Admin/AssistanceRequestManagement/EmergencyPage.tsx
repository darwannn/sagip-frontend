// TODO: fetch emergency / assistance data
//       assign responder to emergency
//       mark emergency as resolved?
import { useNavigate, useParams } from "react-router";
import { MdArrowBack } from "react-icons/md";
import { useGetAssistanceRequestByIdQuery } from "../../../services/assistanceRequestQuery";
import { Badge } from "../../../components/ui/Badge";
import { useState } from "react";
import MapComponent from "../FacilityManagement/components/MapComponent";
import { MarkerF } from "@react-google-maps/api";
import { useGetActiveTeamsQuery } from "../../../services/teamQuery";
import Select from "react-select";
import { TbClockPin } from "react-icons/tb";
import { formatAsstReqDate } from "../../../util/date";
import moment from "moment";
import { RiGpsLine } from "react-icons/ri";
import { BASE_IMAGE_URL } from "../../../api.config";

const EmergencyPage = () => {
  // Map State / Instance
  const [, setMap] = useState<google.maps.Map | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAssistanceRequestByIdQuery(
    id ?? ""
  );
  const {
    data: rescueTeam,
    isSuccess,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamError,
  } = useGetActiveTeamsQuery();

  // Get the names of the rescue team and put it in the select options
  const rescueTeamNames = rescueTeam?.map((team) => ({
    value: team._id,
    label: team.name,
  }));

  if (isTeamLoading) console.log("Loading...");
  if (isTeamError) console.log(teamError);
  if (isSuccess) console.log(rescueTeam);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="w-full flex flex-col bg-gray-100 min-h-screen relative">
      {/* header */}
      <div className="px-10 pt-10 pb-5 bg-white shadow z-10">
        {/* TODO: ASSISTANCE ID HERE */}
        <div className="text-sm">
          <button
            onClick={() => navigate("/admin/emergency-reports")}
            className="flex flex-row items-center gap-2 text-gray-500 font-semibold hover:bg-gray-200 p-2 rounded transition-all duration-100"
          >
            <MdArrowBack />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-red-500">
            65082951d2c94183011a5403
          </h1>
        </div>
      </div>
      {/* body */}
      <div className="flex-1 grid grid-cols-3 bg-white">
        <div className="p-5 flex flex-col">
          <div className="flex flex-row gap-2 mb-5">
            <Badge className="rounded bg-blue-500 text-white text-sm">
              Ongoing
            </Badge>
            <Badge className="rounded bg-red-500 text-white text-sm">
              Injury
            </Badge>
          </div>
          {/* User Profile */}
          <div className="flex items-center gap-5 p-3 bg-slate-100 rounded-md">
            <div className="w-16 h-16 bg-gray-300 rounded-full">
              <img
                alt="user profile"
                src="https://picsum.photos/100"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-sm">
              <div>
                <span className="font-semibold text-gray-500">Reporter</span>
                <p className="">{`${data?.userId.firstname} ${data?.userId.lastname}`}</p>
              </div>
              <div>
                <p>{data?.userId.email}</p>
              </div>
            </div>
          </div>
          {/* Emergency Information */}
          <div className="flex-1 flex flex-col gap-2 mt-5">
            {/* Image container */}
            <div className="grow p-2 border rounded-md">
              {data?.proof ? (
                <img
                  src={`${BASE_IMAGE_URL}/assistance-request/${data.proof}`}
                  alt="emergency image"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <p className="font-semibold text-center text-gray-400">
                  No Image Attached.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-5 border-x">
          <h2 className="font-semibold text-lg text-gray-700">
            Additional Information
          </h2>
          <hr className="my-5" />
          <div className="flex flex-row gap-5">
            {/* Time Reported */}
            <div className="flex-1 flex items-start gap-2">
              <div className="bg-red-200 p-1 rounded">
                <TbClockPin className="text-red-700 text-sm" />
              </div>
              <div className="text-sm">
                <span className="">Time Reported</span>
                <p className="font-semibold">
                  {formatAsstReqDate(data?.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-start gap-2">
              <div className="bg-green-200 p-1 rounded">
                <TbClockPin className="text-green-700 text-sm" />
              </div>
              <div className="text-sm">
                <span className="">Time Accepted</span>
                <p className="font-semibold">
                  {formatAsstReqDate(moment().toISOString())}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2 mt-5">
            <div className="bg-blue-200 rounded p-1">
              <RiGpsLine className="text-blue-500 text-sm" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-500 mb-1">GPS Data</h2>
              <div className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <span className="font-semibold text-gray-500">Latitude</span>
                  <div className="p-2 border rounded">
                    <p className="">{data?.latitude}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Longitude</span>
                  <div className="p-2 border rounded">
                    <p className="">{data?.longitude}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Street</span>
                  <div className="p-2 border rounded">
                    <p className="">{data?.street}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-500">
                    Municipality
                  </span>
                  <div className="p-2 border rounded">
                    <p className="">{data?.municipality}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex flex-col gap-5">
            <div className="text-sm flex flex-col gap-2">
              <span className="font-semibold text-gray-500">
                Is anyone injured ?
              </span>
              <div className="border p-3 rounded-md">
                Yes, there are injuries and/or medical emergencies
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2">
              <span className="font-semibold text-gray-500">
                No. of people affected by the emergency
              </span>
              <div className="border p-3 rounded-md">1 - 5 People</div>
            </div>
            <div className="text-sm flex flex-col gap-2">
              <span className="font-semibold text-gray-500">
                Emergency Description
              </span>
              <div className="border p-5 rounded-md max-h-[350px] overflow-y-auto text-justify">
                There was a car accident in the intersection of Robinson and
                Fausta. The car was going northbound and the cyclist was going
                eastbound. The car was going too fast and hit the cyclist. The
                cyclist was thrown off the bike and hit the pavement. The
                cyclist is bleeding and unconscious. The car driver is unharmed.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[50%]">
            <MapComponent
              onSetMapHandler={setMap}
              containerStyle={{ width: "100%", height: "100%" }}
              customCenter={{
                lat: data?.latitude || 0,
                lng: data?.longitude || 0,
              }}
            >
              <MarkerF
                position={{
                  lat: data?.latitude || 0,
                  lng: data?.longitude || 0,
                }}
              ></MarkerF>
            </MapComponent>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div className="flex flex-row gap-2 text-gray-700">
              <h3 className="text-md font-semibold">
                Select Available Responders
              </h3>
            </div>
            <div>
              <Select options={rescueTeamNames} />
              <button className="btn-primary mt-5">Send Responders</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
