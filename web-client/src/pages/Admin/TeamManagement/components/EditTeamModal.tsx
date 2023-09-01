import { User } from "../../../../types/user";
import UserCard from "./UserCard";
import { TTeam } from "../../../../types/team";
import { AiOutlineMinus } from "react-icons/ai";
import {
  useUnassignHeadMutation,
  useUnassignMemberMutation,
} from "../../../../services/teamQuery";
import AddResponderForm from "./AddResponderForm";
type TProps = {
  teamData?: TTeam;
};

const EditTeamModal: React.FC<TProps> = ({ teamData }) => {
  const [unassignMember, unassignMemberState] = useUnassignMemberMutation();
  const [unassignHead, unassignHeadState] = useUnassignHeadMutation();

  const onClickUnassignResponder = (responder: User, type: string) => {
    const confirm = window.confirm(
      "Are you sure you want to unassign this responder?"
    );
    if (!confirm) return;
    console.log("unassigning responder");

    if (type === "member") {
      unassignMember({
        userId: responder._id,
        prevTeamId: teamData?._id || "",
      });
    } else if (type === "head") {
      console.log("unassigning head");
      unassignHead({
        userId: responder._id,
        prevTeamId: teamData?._id || "",
      });
    }
  };

  if (unassignMemberState.isError) console.log(unassignMemberState.error);
  if (unassignMemberState.isSuccess) console.log(unassignMemberState.data);

  if (unassignHeadState.isError) console.log(unassignHeadState.error);
  if (unassignHeadState.isSuccess) console.log(unassignHeadState.data);

  return (
    <div className="w-[600px]">
      <AddResponderForm />
      <div className="m-3">
        {/* Head */}
        <span className="font-semibold">Head</span>
        <div className="flex flex-row justify-between items-center p-2 my-3">
          {teamData?.head ? (
            <>
              <UserCard user={teamData.head} />
              <div>
                <button
                  className="text-gray-300 bg-gray-100 p-0.5 rounded-full hover:bg-red-200 hover:text-red-500 transition duration-200"
                  onClick={() =>
                    onClickUnassignResponder(teamData.head, "head")
                  }
                >
                  <AiOutlineMinus />
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-gray-500 text-center">
                No Head assigned for this team yet
              </span>
            </>
          )}
        </div>
        {/* Members */}
        <span className="font-semibold">Members</span>
        <div className="flex flex-col gap-2 my-3 p-2">
          {teamData?.members.map((member) => (
            <div
              key={member._id}
              className="flex flex-row justify-between items-center"
            >
              <UserCard user={member} />
              <div>
                <button
                  className="text-gray-300 bg-gray-100 p-0.5 rounded-full hover:bg-red-200 hover:text-red-500 transition duration-200"
                  onClick={() => onClickUnassignResponder(member, "member")}
                >
                  <AiOutlineMinus />
                </button>
              </div>
            </div>
          ))}
          {teamData?.members.length === 0 && (
            <span className="text-gray-500">
              No members assigned for this team yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
