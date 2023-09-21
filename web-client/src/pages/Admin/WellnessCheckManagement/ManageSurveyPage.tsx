import SurveyTable from "./components/SurveyTable";

import SurveyAnalytics from "./SurveyAnalytics";

const ManageSurveyPage = () => {
  return (
    <div className="bg-gray-50 p-10 min-h-screen flex flex-col">
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
      <SurveyAnalytics />
      <SurveyTable />
    </div>
  );
};

export default ManageSurveyPage;
