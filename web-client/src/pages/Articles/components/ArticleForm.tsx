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
      <ArticleDetailsForm />
      <ArticleContentEditor />
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
        <label htmlFor="author">Author</label>
        <span>{`${user?.firstname} ${user?.lastname}`}</span>
        <label htmlFor="date">Created:</label>
        <span>{currentDate}</span>
      </div>
    </form>
  );
};

export default ArticleForm;
