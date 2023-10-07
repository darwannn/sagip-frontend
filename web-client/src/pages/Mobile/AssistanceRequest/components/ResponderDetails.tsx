/* import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"; */
import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import { FaHandsHelping } from "react-icons/fa";

type TProps = {
  responderDistance: string;
  assistanceData: TAssistanceRequest;
  estimatedTime: string;
  /* isFollowingResponder: boolean;
  setIsFollowingResponder: React.Dispatch<React.SetStateAction<boolean>>; */
};

const ResponderDetails = ({
  assistanceData,
  responderDistance,
  estimatedTime /* isFollowingResponder,
  setIsFollowingResponder, */,
}: TProps) => {
  return (
    <>
      <div className="flex px-5 pb-5">
        <div className="flex flex-col flex-1">
          <div className="flex text-gray-500 gap-2">
            <FaHandsHelping className=" text-xl" />
            <div className=" text-sm">Responders is on their way:</div>
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {assistanceData.assignedTeam?.name}
          </div>
          <div className="text-gray-500">
            {responderDistance} | {estimatedTime}
          </div>
        </div>
        {/* <div
          className="text-xl"
          onClick={() => {
            setIsFollowingResponder(!isFollowingResponder);
          }}
        >
          {isFollowingResponder ? (
            <div className="text-white bg-primary-600 p-2 rounded-md">
              <BsFillEyeFill />
            </div>
          ) : (
            <div className="text-white bg-primary-300 p-2 rounded-md">
              <BsFillEyeSlashFill />
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default ResponderDetails;
