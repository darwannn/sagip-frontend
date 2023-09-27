// TODO: fetch emergency / assistance data
//       display user information
//       display emergency information
//       display emergency map
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
        <div className="p-5 ">
          <h2>User Information</h2>
        </div>
        <div className="p-5 border-x flex flex-col">
          <div className="flex flex-row gap-2 mb-5">
            <Badge className="rounded bg-blue-500 text-white text-sm">
              Ongoing
            </Badge>
            <Badge className="rounded bg-red-500 text-white text-sm">
              Injury
            </Badge>
          </div>
          {/* User Profile */}
          <div className="flex items-center gap-5 p-2 bg-blue-100 rounded">
            <div className="w-16 h-16 bg-gray-300 rounded-full">
              <img
                src="https://picsum.photos/100"
                alt="user profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-sm">Reporter</span>
              <p className="font-semibold">{`${data?.userId.firstname} ${data?.userId.lastname}`}</p>
            </div>
          </div>
          {/* Emergency Information */}
          <div className="flex-1 flex flex-col gap-2 mt-5">
            {/* <div className="flex flex-col gap-1">
              <span className="text-sm">Emergency Type</span>
              <p className="font-semibold">{}</p>
            </div> */}
            {/* Image container */}
            <div className="grow w-full">
              <img
                src={`https://media.istockphoto.com/id/1162083787/photo/road-accident-with-injured-cyclist-and-car-driver.jpg?s=1024x1024&w=is&k=20&c=HIsF7QtzWR6uG6WjO3MCgeklo9mRD2VWnQ6jNEy93Pk=`}
                alt="emergency image"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="description mt-2">
              <span className="form-label">Description</span>
              <textarea
                name="description"
                className="w-full h-[200px] mt-2 p-2 rounded border resize-none"
                value={`There was a car accident in the intersection of Robinson and Fausta. The car was going northbound and the cyclist was going eastbound. The car was going too fast and hit the cyclist. The cyclist was thrown off the bike and hit the pavement. The cyclist is bleeding and unconscious. The car driver is unharmed.`}
                disabled
              ></textarea>
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
