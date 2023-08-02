import { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import UserCard from "./UserCard";
import { AiOutlineMinus } from "react-icons/ai";
import {
  useAddTeamHeadMutation,
  useAddTeamMemberMutation,
  useLazyGetUnassignedRespondersQuery,
} from "../../../services/teamQuery";
// Types
import { User } from "../../../types/user";
import { BASE_IMAGE_URL } from "../../../api.config";

const AddResponderForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [getResponders, results] = useLazyGetUnassignedRespondersQuery();
  const [searchUser, setSearchUser] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); //
  const [teamRole, setTeamRole] = useState("");
  const [addTeamHead, addTeamHeadState] = useAddTeamHeadMutation();
  const [addTeamMember, addTeamMemberState] = useAddTeamMemberMutation();

  const onClickAddResponder = () => {
    if (!selectedUser) return;
    if (teamRole === "head") {
      addTeamHead({ teamId: id || "", userId: selectedUser._id });
    } else {
      addTeamMember({
        teamId: id || "",
        userId: selectedUser._id,
      });
    }
  };

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

  if (results.isError) console.log(results.error);

  if (addTeamHeadState.isError) console.log(addTeamHeadState.data);
  if (addTeamHeadState.isSuccess) console.log(addTeamHeadState.data);

  if (addTeamMemberState.isError) console.log(addTeamMemberState.error);
  if (addTeamMemberState.isSuccess) console.log(addTeamMemberState.data);

  return (
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
  );
};

export default AddResponderForm;
