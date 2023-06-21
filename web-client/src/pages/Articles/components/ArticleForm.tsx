import { useMemo, useState } from "react";
import moment from "moment";
// Services
import { useGetUserByIdQuery } from "../../../services/usersApi";
import ArticleContentEditor from "./ArticleContentEditor";
import ArticleDetailsForm from "./ArticleDetails";
const ArticleForm = () => {
  /**
   * This way of getting user info might not be the best way.
   * This should be changed in the future.
   * Maybe use redux to store user info?
   */
  const userId = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).id : "";
  }, []);
  const { data: user } = useGetUserByIdQuery(userId);
  const currentDate = useMemo(() => moment().format("YYYY-MM-DD"), []);

  return (
    <form>
      <ArticleDetailsForm user={user} currentDate={currentDate} />
      <ArticleContentEditor />
      <button className="bg-indigo-500 text-white px-5 py-1 my-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
