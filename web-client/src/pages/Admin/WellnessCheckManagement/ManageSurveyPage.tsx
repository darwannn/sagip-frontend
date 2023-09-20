import { Link } from "react-router-dom";
import { useGetSurveyQuery } from "../../../services/surveyQuery";
import SurveyTable from "./components/SurveyTable";

import ActiveSurvey from "./components/ActiveSurvey";

const ManageSurveyPage = () => {
  const { data: surveys, isLoading, error } = useGetSurveyQuery(undefined);

  if (error) {
    return <p>Something went wrong...</p>;
  }
  const tableComponent = surveys ? (
    <SurveyTable alertData={surveys} />
  ) : (
    <p>No survey found</p>
  );

  return (
    <div className="p-10 min-h-screen flex flex-col">
      {/* <div className=" lg:w-1/4 w-full m-5">
        <h1 className=" font-bold">Send Alerts</h1>
        <SMSAlertForm />
      </div> */}
      <div className="">
        <h1 className="text-2xl font-bold text-primary-500">
          Wellness Check Survey
        </h1>
        <p>
          Monitor the well being of the community. Create, deploy, and oversee
          wellness check surveys for users.{" "}
        </p>
        <hr className="my-5" />
      </div>

      <div className="  w-full m-5">
        <Link className="btn-primary float-right" to={"create"}>
          New Survey
        </Link>
        <ActiveSurvey />
        {isLoading ? <p>Getting survey....</p> : tableComponent}
        {/* <AlertForm/> */}
      </div>
    </div>
  );
};

export default ManageSurveyPage;
