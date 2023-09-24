import moment from "moment";
import { TbInputCheck } from "react-icons/tb";
import { TActiveSurvey } from "../../../../types/survey";
import { useNavigate } from "react-router-dom";

type ActiveSurveyProps = {
  surveyData: TActiveSurvey | undefined;
};

const ActiveSurvey: React.FC<ActiveSurveyProps> = ({ surveyData }) => {
  const navigate = useNavigate();
  const totalResponse =
    surveyData && surveyData.affected.length + surveyData.unaffected.length;

  return (
    <div
      className="w-max p-6 border-2 border-green-500  bg-white rounded-md shadow-md cursor-pointer"
      onClick={() => navigate(`${surveyData?._id}`)}
    >
      <div className="flex flex-row gap-10">
        <div className="flex flex-row items-start gap-3 text-sm">
          <div>
            <div>
              <p className=" text-gray-500">Ongoing Survey</p>
              <p className="text-lg text-green-500 font-bold">
                {surveyData?.title}
              </p>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">Posted: </span>
              <span className="">
                {moment(surveyData?.startDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 text-sm">
          <div className="bg-green-100 p-2 rounded-md">
            <span>
              <TbInputCheck className="text-lg text-green-400" />
            </span>
          </div>
          <div>
            <div>
              <p className=" text-gray-500">Responses</p>
              <p className="text-xl font-bold">{totalResponse}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSurvey;
