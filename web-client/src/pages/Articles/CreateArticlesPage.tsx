import { useEditor } from "@tiptap/react";
import Tiptap from "../../components/tiptap-text-editor/Tiptap";
import StarterKit from "@tiptap/starter-kit";
import CustomMenuBar from "../../components/tiptap-text-editor/CustomMenuBar";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
// import FileDropzone from "../../components/Form/FileDropzone";

const CreateArticlesPage = () => {
  const [title, setTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [content, setContent] = useState<string>("<p>Start writing...</p>");

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

  /**
   * Might encounter this error:
   * "Cannot read properties of null (reading 'matchesNode')"
   * More info: https://github.com/ueberdosis/tiptap/issues/1451
   */

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="m-5">
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
        // <FileDropzone handleFileChange={onFileChangeHandler} />
      )}
      <div className="tiptapEditor">
        <CustomMenuBar editor={editor} />
        <Tiptap editor={editor} />
      </div>
      {/**
       * TODO: Display article other details
       * 1. Category
       * 2. Author / User
       * 3. Creation Date (auto generated: Date.now())
       */}
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
        <label htmlFor="author">Author</label>
        <span>Author Name</span>
        <label htmlFor="date">Created:</label>
        <span>{currentDate}</span>
      </div>
    </div>
  );
};

export default CreateArticlesPage;
