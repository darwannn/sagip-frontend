import { Editor } from "@tiptap/react";
// ICONS
import {
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import {
  LuItalic,
  LuBold,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuUndo2,
  LuRedo2,
} from "react-icons/lu";

type PROPS = {
  editor: Editor | null;
};

export const CustomMenuBar = ({ editor }: PROPS) => {
  return (
    <div className="flex flex-row justify-between my-2">
      <section className="flex flex-row gap-2">
        <div className="flex flex-row bg-slate-100 rounded p-1.5 gap-1">
          {/* Bold */}
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("bold") ? "bg-blue-200" : ""
            }`}
          >
            <LuBold />
          </button>
          {/* Italic */}
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("italic") ? "bg-blue-200" : ""
            }`}
          >
            <LuItalic />
          </button>
          {/* Unordered List */}
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("bulletList") ? "bg-blue-200" : ""
            }`}
          >
            <MdOutlineFormatListBulleted />
          </button>
          {/* Ordered List */}
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("orderedList") ? "bg-blue-200" : ""
            }`}
          >
            <MdOutlineFormatListNumbered />
          </button>
        </div>
        <div className="flex flex-row bg-slate-100 rounded p-1.5 gap-1">
          <button
            type="button"
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={`px-2 rounded text-sm ${
              editor?.isActive("paragraph") ? "bg-blue-200" : ""
            }`}
          >
            Paragraph
          </button>
          {/* Headings */}
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("heading", { level: 1 }) ? "bg-blue-200" : ""
            }`}
          >
            <LuHeading1 />
          </button>
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("heading", { level: 2 }) ? "bg-blue-200" : ""
            }`}
          >
            <LuHeading2 />{" "}
          </button>
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`h-8 w-8 flex items-center justify-center rounded ${
              editor?.isActive("heading", { level: 3 }) ? "bg-blue-200" : ""
            }`}
          >
            <LuHeading3 />
          </button>
        </div>
      </section>
      <section className="flex flex-row bg-slate-100 rounded p-1.5 gap-1">
        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          className={`h-8 w-8 flex items-center justify-center rounded hover:bg-blue-200 cursor-pointer`}
        >
          <LuUndo2 />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          className={`h-8 w-8 flex items-center justify-center rounded hover:bg-blue-200 cursor-pointer`}
        >
          <LuRedo2 />
        </button>
      </section>
    </div>
  );
};

export default CustomMenuBar;
