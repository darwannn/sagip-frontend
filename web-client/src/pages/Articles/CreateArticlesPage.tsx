import { useEditor } from "@tiptap/react";
import Tiptap from "../../components/tiptap-text-editor/Tiptap";
import StarterKit from "@tiptap/starter-kit";
import CustomMenuBar from "../../components/tiptap-text-editor/CustomMenuBar";

const CreateArticlesPage = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write Something ...</p>",
  });

  return (
    <>
      <h1>Create Articles Page</h1>
      <div className="tiptapEditor m-5">
        <CustomMenuBar editor={editor} />
        <Tiptap editor={editor} />
      </div>
    </>
  );
};

export default CreateArticlesPage;
