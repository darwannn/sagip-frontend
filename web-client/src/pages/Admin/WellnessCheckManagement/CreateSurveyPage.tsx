import { Link } from "react-router-dom";
import SurveyForm from "./components/SurveyForm";

const CreateSurveyPage = () => {
  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/admin/wellness-check"}
      >
        Cancel
      </Link>
      <SurveyForm />
    </div>
  );
};

export default CreateSurveyPage;
