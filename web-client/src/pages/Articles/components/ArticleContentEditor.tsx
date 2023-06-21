import { useEditor } from "@tiptap/react";
import { ControllerRenderProps } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";

// Components
import CustomMenuBar from "../../../components/tiptap-text-editor/CustomMenuBar";
import Tiptap from "../../../components/tiptap-text-editor/Tiptap";

type PROPS = {
  content: string;
  onChange: ControllerRenderProps["onChange"];
};

const ArticleContentEditor = ({ content, onChange }: PROPS) => {
  /**
   * Might encounter this error:
   * "Cannot read properties of null (reading 'matchesNode')"
   * More info: https://github.com/ueberdosis/tiptap/issues/1451
   */
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="tiptapEditor">
      <CustomMenuBar editor={editor} />
      <Tiptap editor={editor} />
    </div>
  );
};

export default ArticleContentEditor;
