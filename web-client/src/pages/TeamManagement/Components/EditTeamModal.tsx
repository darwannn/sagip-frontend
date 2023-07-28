import { useState } from "react";
import { User } from "../../../types/user";
import { BASE_IMAGE_URL } from "../../../api.config";
import UserCard from "./UserCard";
import { TTeam } from "../Types/Team";
import Select from "react-select";
import { AiOutlineMinus } from "react-icons/ai";
import {
  useAddTeamHeadMutation,
  useLazyGetUnassignedRespondersQuery,
} from "../../../services/teamQuery";
type TProps = {
  teamData?: TTeam;
};

const EditTeamModal: React.FC<TProps> = ({ teamData }) => {
  // const [getResponders, results] = useLazyGetRespondersQuery();
  const [getResponders, results] = useLazyGetUnassignedRespondersQuery();

  const getFilteredResponders = () => {
    if (searchUser !== "") {
      // Filter unassigned responders by name using searchUser
      return results.data?.filter((responder) => {
        const fullname = `${responder.lastname} ${responder.firstname} ${responder.middlename}`;
        return fullname.toLowerCase().includes(searchUser.toLowerCase());
      });
    }
    return results.data;
  };

  const [addTeamHead, addTeamHeadState] = useAddTeamHeadMutation();

  const [isAddMode, setIsAddMode] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [teamRole, setTeamRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null); //

  const onClickAddResponder = () => {
    if (!selectedUser) return;
    if (teamRole === "head") {
      addTeamHead({ teamId: teamData?._id || "", userId: selectedUser._id });
    }
  };

  if (results.isError) console.log(results.error);

  if (addTeamHeadState.isError) console.log(addTeamHeadState.data);
  if (addTeamHeadState.isSuccess) console.log(addTeamHeadState.data);

  return (
    <div className="w-[600px]">
      {/* Search */}
      <div className="flex flex-row gap-1 items-center">
        <div className="flex-grow relative">
          {selectedUser ? (
            <>
              <div className="flex flex-row justify-between items-center">
                <UserCard user={selectedUser} />
                <button
                  className="text-gray-300 bg-gray-100 p-1 rounded-full hover:bg-red-200 hover:text-red-500 transition duration-200"
                  onClick={() => setSelectedUser(null)}
                >
                  <AiOutlineMinus />
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search for a user"
                className="border p-2 rounded-md w-full text-sm"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                onFocus={() => {
                  setIsAddMode(true);
                  getResponders();
                }}
                // onBlur={() => setIsAddMode(false)}
              />
              {/* Suggestions */}
              {isAddMode && (
                <div className="border rounded shadow-sm w-full bg-white absolute left-0 max-h-40 overflow-x-auto flex flex-col gap-1">
                  {results.isLoading ? (
                    <>
                      <span className="text-gray-500 text-center">
                        Users Loading...
                      </span>
                    </>
                  ) : (
                    <>
                      {getFilteredResponders()?.map((responder) => (
                        <div
                          key={responder._id}
                          className="flex flex-row items-center gap-1 p-1 hover:bg-gray-300 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(responder);
                            setSelectedUser(responder);
                            setIsAddMode(false);
                          }}
                        >
                          {/* Image Container  */}
                          <div>
                            <img
                              src={`${BASE_IMAGE_URL}/user/${responder.profilePicture}`}
                              alt="profile"
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          {/* User Details */}
                          <div className="flex flex-col">
                            <span>{`${responder.lastname}, ${responder.firstname} ${responder.middlename}`}</span>
                            <span className="text-sm text-gray-500">
                              {responder.email}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <Select
          className="w-[140px] text-sm"
          options={[
            { value: "member", label: "Member" },
            { value: "head", label: "Head" },
          ]}
          defaultValue={{ value: "member", label: "Member" }}
          onChange={(e) => setTeamRole(e?.value || "")}
          isDisabled={addTeamHeadState.isLoading}
        />
        <button
          className="text-base bg-indigo-500 text-white px-6 py-2 rounded disabled:bg-indigo-300 disabled:cursor-wait"
          onClick={onClickAddResponder}
          disabled={addTeamHeadState.isLoading}
        >
          {addTeamHeadState.isLoading ? "Adding..." : "Add"}
        </button>
      </div>
      <div className="m-3">
        {/* Head */}
        <span className="font-semibold">Head</span>
        <div className="flex flex-row justify-between items-center p-2 my-3">
          {teamData?.head ? (
            <>
              <UserCard user={teamData.head} />
              <div>{/* ACTIONS */}</div>
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
              <div>{/* ACTIONS */}</div>
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
