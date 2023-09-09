import { useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";

import { IoMdArrowRoundBack } from "react-icons/io";

const CreateArticlesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-5 py-5">
      {/* <button
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        onClick={() => navigate(-1)}
      >
        Back
      </button> */}
      <div className="max-w-[1000px] mx-auto">
        <section className="mb-5 flex gap-2">
          <button
            className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
          </button>
          <h1 className="text-2xl font-semibold text-primary-500">
            Write Article
          </h1>
        </section>
        <hr />
        <ArticleForm />
      </div>
    </div>
  );
};

export default CreateArticlesPage;
