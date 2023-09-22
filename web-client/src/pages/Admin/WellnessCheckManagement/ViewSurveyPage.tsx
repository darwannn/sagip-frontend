import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import SurveyForm from "./components/SurveyForm";
import { useGetSurveyByIdQuery } from "../../../services/surveyQuery";
import { Badge } from "../../../components/ui/Badge";
import { BiSolidCalendarAlt, BiSolidCalendarCheck } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import ResponseTable from "./components/ResponseTable";

const ViewSurveyPage = () => {
  const navigate = useNavigate();
  const { alertId } = useParams();
  const {
    data: surveyData,
    isLoading,
    isFetching,
    error,
  } = useGetSurveyByIdQuery(alertId);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(alertId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  const startDate = moment(surveyData?.startDate).format("MMM D, YYYY | h:mma");
  const endDate = moment(surveyData?.endDate).format("MMM D, YYYY | h:mma");

  console.log(surveyData);

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* <SurveyForm surveyData={alertData} /> */}
      <div className="bg-white pt-10 pb-5 px-10 shadow">
        <div>
          <button
            className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
            onClick={() => navigate("/admin/wellness-check")}
          >
            <IoMdArrowRoundBack />
          </button>
        </div>
        <div className="flex flex-row items-center gap-3">
          <h1 className="font-bold text-2xl text-indigo-500">
            {surveyData?.title}
          </h1>
          <Badge className="rounded-md text-xs bg-gray-500">
            {surveyData?.category}
          </Badge>
        </div>
        <hr className="my-3" />
        <div className="text-sm flex flex-row gap-3">
          <div className="flex flex-row items-center gap-2">
            <span>
              <BiSolidCalendarAlt className="text-gray-400" />
            </span>
            <span className="text-gray-500">{`Posted: ${startDate}`}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span>
              <BiSolidCalendarCheck className="text-gray-400" />
            </span>
            <span className="text-gray-500">{`Ended: ${endDate}`}</span>
          </div>
        </div>
      </div>
      <div className="p-10">
        {surveyData && <ResponseTable surveyData={surveyData} />}
      </div>
    </div>
  );
};

export default ViewSurveyPage;
