import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";

type RichTextViewProps = {
  value?: string;
};

export const RichTextView = ({ value }: RichTextViewProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Link
    ],
    content: "",
    editable: false
  });

  useEffect(() => {
    editor?.commands.setContent(value ? JSON.parse(value) : "");
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor-content-container">
      <EditorContent editor={editor} />
    </div>
  );
};
