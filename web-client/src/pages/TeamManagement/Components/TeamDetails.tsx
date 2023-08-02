import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTeamMutation,
  useGetTeamQuery,
} from "../../../services/teamQuery";
import { useLazyGetRespondersQuery } from "../../../services/responderQuery";
import { useState } from "react";
import MembersTable from "./TeamMembersTable";
import Modal from "../../../components/Modal/Modal";
import EditTeamModal from "./EditTeamModal";
import TeamHeadInformation from "./TeamHeadInformation";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {
    data: teamData,
    isFetching,
    isError,
    error,
  } = useGetTeamQuery(id || "");

  const [deleteTeam, deleteState] = useDeleteTeamMutation();
  const [getResponders, results] = useLazyGetRespondersQuery();

  const onDeleteTeamHandler = async () => {
    const cont = confirm("Are you sure you want to delete this team?");
    if (!cont) return;
    const res = await deleteTeam(id || "");
    if ("data" in res) {
      if ("success" in res.data && res.data.success === true)
        navigate("/teams");
    }
  };

  if (results.isError) console.log(results.error);
  if (isError) console.log(error);

  if (deleteState.error) console.log(deleteState.error);

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
        <div className="flex flex-row justify-between items-center mb-10">
          <div>
            <span className="text-sm text-gray-400">{teamData?._id}</span>
            <h1 className="text-4xl font-bold text-blue-500">
              {teamData?.name}
            </h1>
          </div>
          <div>
            <button
              className="bg-indigo-500 text-white px-6 py-2 rounded mt-2"
              onClick={() => {
                getResponders();
                setShowModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded mt-2 ml-2"
              onClick={onDeleteTeamHandler}
            >
              Delete
            </button>
          </div>
        </div>
        {/* Team Leader */}
        <div className="relative mb-10">
          <span className="font-semibold text-lg">Team Leader </span>
          {teamData && teamData.head !== null ? (
            <TeamHeadInformation user={teamData.head} />
          ) : (
            <div className="my-2">
              <p className="text-gray-700 text-[16px] leading-tight">
                No leader assigned for this team.
              </p>
            </div>
          )}
        </div>
        <div className="">
          {/* Team Members */}
          <span className="font-semibold text-lg">Team Members </span>
          <MembersTable membersData={teamData?.members || []} />
        </div>
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
