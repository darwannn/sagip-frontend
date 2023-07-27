import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../../services/teamQuery";
import UserCard from "./UserCard";
import { useLazyGetRespondersQuery } from "../../../services/responderQuery";
import { useState } from "react";
import { User } from "../../../types/user";
import MembersTable from "./TeamMembersTable";
import Modal from "../../../components/Modal/Modal";
import Select from "react-select";
import { BASE_IMAGE_URL } from "../../../api.config";

const TeamDetails = () => {
  const { id } = useParams();
  const [searchUser, setSearchUser] = useState("");
  const [selectedHead, setSelectedHead] = useState<User | null>(null); //
  const [showModal, setShowModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const {
    data: teamData,
    isFetching,
    isError,
    error,
  } = useGetTeamQuery(id || "");

  const [getResponders, results] = useLazyGetRespondersQuery();

  if (results.isError) console.log(results.error);
  if (results.isSuccess) console.log(results.data);

  if (isError) console.log(error);

  if (isFetching) {
    return (
      <div>
        <p className="text-center">Fetching Team Data...</p>
      </div>
    );
  }

  const getFilteredResponders = () => {
    if (searchUser !== "") {
      // Filter unassigned responders by name using searchUser
      return results.data?.unassignedResponders.filter((responder) => {
        const fullname = `${responder.lastname} ${responder.firstname} ${responder.middlename}`;
        return fullname.toLowerCase().includes(searchUser.toLowerCase());
      });
    }
    return results.data?.unassignedResponders;
  };

  return (
    <>
      <div className="p-5 flex-grow">
        <div>
          <span className="text-sm text-gray-400">{teamData?._id}</span>
          <h1 className="text-3xl font-bold">{teamData?.name}</h1>
        </div>
        {/* Team Leader */}
        <div className="relative">
          <span>Team Leader: </span>
          {teamData && teamData.head !== null ? (
            <UserCard user={teamData.head} />
          ) : (
            <>
              {selectedHead ? (
                <UserCard user={selectedHead} />
              ) : (
                <div
                  className="border px-3 py-1 cursor-pointer rounded-md relative"
                  onClick={() => {
                    if (!isAddMode) {
                      setIsAddMode(true);
                      getResponders();
                    } else setIsAddMode(false);
                  }}
                >
                  <p className="text-gray-700 text-[16px] leading-tight">
                    No leader assigned for this team.
                  </p>
                  <span className="text-sm text-gray-500">
                    Click here to assign.
                  </span>
                </div>
              )}

              {/* RESPONDERS SELECTION */}
              {/* {isAddMode && (
                <div className="border bg-white absolute left-0 max-h-40 overflow-x-auto flex flex-col gap-2">
                  {results.isLoading ? (
                    <p>Loading Responders</p>
                  ) : (
                    results.data?.unassignedResponders.map((responder) => (
                      <div
                        key={responder._id}
                        className="border p-1 hover:bg-gray-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHead(responder);
                          setIsAddMode(false);
                        }}
                      >
                        <span>{responder._id}</span>
                      </div>
                    ))
                  )}
                </div>
              )} */}
            </>
          )}
        </div>
        <button
          className="bg-indigo-500 text-white px-6 py-2 rounded mt-2"
          onClick={() => {
            getResponders();
            setShowModal(true);
          }}
        >
          Edit Team
        </button>

        {/* Team Members */}
        <MembersTable membersData={teamData?.members || []} />
      </div>
      <Modal
        modalTitle={"Edit Team"}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <div className="w-[600px]">
          {/* Search */}
          <div className="flex flex-row gap-1">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search for a user"
                className="border p-2 rounded-md w-full text-sm"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                onFocus={() => setIsAddMode(true)}
                onBlur={() => setIsAddMode(false)}
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
                            setSelectedHead(responder);
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
            </div>
            <Select
              className="w-[140px] text-sm"
              options={[
                { value: "member", label: "Member" },
                { value: "head", label: "Head" },
              ]}
              defaultValue={{ value: "member", label: "Member" }}
            />
            <button className="text-base bg-indigo-500 text-white px-6 rounded">
              Add
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
      </Modal>
    </>
  );
};

export default TeamDetails;
