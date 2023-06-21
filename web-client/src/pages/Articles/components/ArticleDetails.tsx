import { useState } from "react";
import { User } from "../../../types/user";

type PROPS = {
  user: User | undefined;
  currentDate: string;
};

const ArticleDetailsForm = ({ user, currentDate }: PROPS) => {
  const [title, setTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string>("");

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
    <>
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
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
        <label htmlFor="author">Author</label>
        <span>
          {user
            ? `${user?.firstname} ${user?.lastname}`
            : `Loading user detail...`}
        </span>
        <label htmlFor="date">Created:</label>
        <span>{currentDate}</span>
      </div>
    </>
  );
};

export default ArticleDetailsForm;
