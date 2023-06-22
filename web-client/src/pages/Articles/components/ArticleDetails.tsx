import { User } from "../../../types/user";
import { FieldValues, UseFormRegister } from "react-hook-form";

type PROPS = {
  user: User | undefined;
  currentDate: string;
  register: UseFormRegister<FieldValues>;
};

const ArticleDetailsForm = ({ user, currentDate, register }: PROPS) => {
  return (
    <>
      <div className="articleDetails w-full flex flex-col">
        <input
          type="text-area"
          id="articleTitle"
          className="p-2 my-1"
          style={{ fontSize: "2.2rem", fontWeight: "bold" }}
          placeholder="Title of article"
          {...register("title")}
        />
      </div>
      <input type="file" id="coverImage" {...register("coverImage")} />
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select id="category" {...register("category")}>
          <option value="General Tips">General Tips</option>
          <option value="Preparedness">Preparedness</option>
          <option value="Flood Safety">Flood Safety</option>
          <option value="Head Safety">Heat Safety</option>
        </select>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="userId"
          value={user ? `${user.firstname} ${user.lastname}` : ""}
          readOnly
        />
        <label htmlFor="date">Created:</label>
        <span>{currentDate}</span>
      </div>
    </>
  );
};

export default ArticleDetailsForm;
