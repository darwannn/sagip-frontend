import { Link } from "react-router-dom";
import SurveyTable from "./components/SurveyTable";

import ActiveSurvey from "./components/ActiveSurvey";

const ManageSurveyPage = () => {
  return (
    <div className="p-10 min-h-screen flex flex-col">
      <div className="">
        <h1 className="text-2xl font-bold text-primary-500">
          Wellness Check Survey
        </h1>
        <p>
          Monitor the well being of the community. Create, deploy, and oversee
          wellness check surveys for users.
        </p>
        <hr className="my-5" />
      </div>

      <Link className="btn-primary w-max float-right" to={"create"}>
        New Survey
      </Link>
      <ActiveSurvey />
      <SurveyTable />
    </div>
  );
};

export default ManageSurveyPage;
