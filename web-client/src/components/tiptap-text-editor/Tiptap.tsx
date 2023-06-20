import { EditorContent, Editor } from "@tiptap/react";

type PROPS = {
  editor: Editor | null;
};

const Tiptap = ({ editor }: PROPS) => {
  return <EditorContent editor={editor} />;
};

export default Tiptap;
