import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CustomMenuBar from "../../../components/tiptap-text-editor/CustomMenuBar";
import Tiptap from "../../../components/tiptap-text-editor/Tiptap";
import { useState } from "react";

const ArticleContentEditor = () => {
  const [content, setContent] = useState<string>("<p>Start writing...</p>");
  // const onEditorUpdateHandler = (conent: string) => {}
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
    <div className="tiptapEditor">
      <CustomMenuBar editor={editor} />
      <Tiptap editor={editor} />
    </div>
  );
};

export default ArticleContentEditor;
