import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../../services/teamQuery";
import UserCard from "./UserCard";
import { useLazyGetRespondersQuery } from "../../../services/responderQuery";
import { useState } from "react";
import MembersTable from "./TeamMembersTable";
import Modal from "../../../components/Modal/Modal";
import EditTeamModal from "./EditTeamModal";

const TeamDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
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
              <div className="border px-3 py-1 cursor-pointer rounded-md relative">
                <p className="text-gray-700 text-[16px] leading-tight">
                  No leader assigned for this team.
                </p>
                <span className="text-sm text-gray-500">
                  Click here to assign.
                </span>
              </div>
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
        <EditTeamModal teamData={teamData} />
      </Modal>
    </>
  );
};

export default TeamDetails;
