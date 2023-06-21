import { useState } from "react";

const ArticleDetailsForm = () => {
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
    </>
  );
};

export default ArticleDetailsForm;
