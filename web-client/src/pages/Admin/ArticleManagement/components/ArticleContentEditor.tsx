import { useEditor } from "@tiptap/react";
import { ControllerRenderProps } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";

// Components
import CustomMenuBar from "../../../../components/tiptap-text-editor/CustomMenuBar";
import Tiptap from "../../../../components/tiptap-text-editor/Tiptap";

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
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: content,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: "rounded bg-slate-100 h-20 border-none focus:outline-gray-300",
        },
      },
    },
    []
  );
  return (
    <div className="form-group">
      <label htmlFor="content" className="form-label">
        Contents
      </label>
      <CustomMenuBar editor={editor} />
      <Tiptap editor={editor} />
    </div>
  );
};

export default ArticleContentEditor;
