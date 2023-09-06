import { Link } from "react-router-dom";
import UserForm from "./components/UserForm";

const CreateArticlesPage = () => {
  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/admin/users"}
      >
        Cancel
      </Link>
      <UserForm />
    </div>
  );
};

export default CreateArticlesPage;
