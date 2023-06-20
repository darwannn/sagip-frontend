import { useEditor } from "@tiptap/react";
import Tiptap from "../../components/tiptap-text-editor/Tiptap";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../../components/tiptap-text-editor/MenuBar";

const CreateArticlesPage = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  return (
    <>
      <h1>Create Articles Page</h1>
      <div className="tiptapEditor m-5">
        <MenuBar editor={editor} />
        <Tiptap editor={editor} />
      </div>
    </>
  );
};

export default CreateArticlesPage;
