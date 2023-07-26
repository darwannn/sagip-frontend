import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../../services/teamQuery";
import UserCard from "./UserCard";
import { useLazyGetRespondersQuery } from "../../../services/responderQuery";
import { useState } from "react";
import { User } from "../../../types/user";
import MembersTable from "./TeamMembersTable";

const TeamDetails = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedHead, setSelectedHead] = useState<User | null>(null); //
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

  return (
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
            {isAddMode && (
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
            )}
          </>
        )}
      </div>
      {/* Team Members */}
      <MembersTable membersData={teamData?.members || []} />
      {/* {teamData?.members && teamData.members.length > 0 ? (
          <div>
            <span>Team Members</span>
            <div className="">
              {teamData.members.map((member) => (
                <UserCard key={member._id} user={member} />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )} */}
    </div>
  );
};

export default TeamDetails;
