import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetToRespondAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import { useGetMyTeamQuery } from "../../../services/teamQuery";

import Malolos_City_Hall from "../../../assets/img/Malolos_City_Hall.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AssistanceList from "./components/AssistanceList";

import { MdChevronLeft } from "react-icons/md";

const ResponderPage = () => {
  const { data: team, refetch: refetchTeam } = useGetMyTeamQuery();
  const { data: assistanceRequest, refetch: refetchAssistanceRequest } =
    useGetToRespondAssistanceRequestsQuery();

  useEffect(() => {
    refetchTeam();
    refetchAssistanceRequest();
  }, [refetchAssistanceRequest, refetchTeam]);

  return (
    <>
      <div
        className="flex flex-col justify-center px-5 pb-5 pt-10 rounded-b-2xl  bg-gray-100 text-white"
        style={{
          background: `linear-gradient(90deg, rgba(151, 32, 32, 0.90) 0%, rgba(41, 59, 149, 0.90) 100%), url(${Malolos_City_Hall})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="flex">
          <Link to="/account-settings">
            <MdChevronLeft className="text-2xl" />
          </Link>
          <div className="">Responder Dashboard</div>
        </div>
        <div className="text-4xl font-bold">{team?.name}</div>
        {/*  <div className="font-2xl font-bold">{team?.position}</div> */}
      </div>
      <div className="mx-3 my-3">
        <AssistanceList assistanceReq={assistanceRequest} />
      </div>
    </>
  );
};

export default ResponderPage;
