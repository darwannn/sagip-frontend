import { Link } from "react-router-dom";
import AlertForm from "./components/AlertForm";

const CreateArticlesPage = () => {
  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/disaster-alerts"}
      >
        Cancel
      </Link>
      <AlertForm />
    </div>
  );
};

export default CreateArticlesPage;
