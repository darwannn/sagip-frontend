import { useMemo, useState } from "react";
import moment from "moment";
// Services
import { useGetUserByIdQuery } from "../../../services/usersApi";
import ArticleContentEditor from "./ArticleContentEditor";
const ArticleForm = () => {
  const [title, setTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string>("");

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

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
    }
  };

  return (
    <form>
      <div className="articleDetails w-full flex flex-col">
        <input
          type="text-area"
          id="articleTitle"
          className="p-2 my-1"
          style={{ fontSize: "2.2rem", fontWeight: "bold" }}
          placeholder="Title of article"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      {imageFile ? (
        <div>
          <img src={imageSrc} alt="preview" />
          <button onClick={() => setImageFile(undefined)}>Remove</button>
          <p>{`Image Name: ${imageFile?.name}`}</p>
        </div>
      ) : (
        <input type="file" onChange={onFileChangeHandler} />
      )}
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
