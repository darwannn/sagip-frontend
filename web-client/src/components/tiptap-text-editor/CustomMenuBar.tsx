import { Editor } from "@tiptap/react";

type PROPS = {
  editor: Editor | null;
};

export const CustomMenuBar = ({ editor }: PROPS) => {
  return (
    <div className="flex flex-row my-2">
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("bold") ? "bg-indigo-500" : "bg-gray-200"
        }`}
      >
        Bold
      </button>
      {/* Italic */}
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("italic") ? "bg-indigo-500" : "bg-gray-200"
        }`}
      >
        Italic
      </button>
      {/* Unordered List */}
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("bulletList") ? "bg-indigo-500" : "bg-gray-200"
        }`}
      >
        Bullet List
      </button>
      {/* Ordered List */}
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("orderedList") ? "bg-indigo-500" : "bg-gray-200"
        }`}
      >
        Ordered List
      </button>
      {/* Headings */}
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("heading", { level: 1 })
            ? "bg-indigo-500"
            : "bg-gray-200"
        }`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("heading", { level: 2 })
            ? "bg-indigo-500"
            : "bg-gray-200"
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={`px-2 py-1 mx-1 rounded ${
          editor?.isActive("heading", { level: 3 })
            ? "bg-indigo-500"
            : "bg-gray-200"
        }`}
      >
        H3
      </button>
    </div>
  );
};

export default CustomMenuBar;
