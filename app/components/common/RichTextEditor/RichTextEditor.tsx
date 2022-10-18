import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  UnorderedListOutlined,
  OrderedListOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  FontColorsOutlined
} from "@ant-design/icons";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Color as DesignSystemColor } from "../../../constants/design-system";
import type { FormItemProps } from "../FormItem";
import { FormItem, extractFormItemProps } from "../FormItem";

enum EditorMenuButtonType {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  BULLET_LIST = "bulletList",
  ORDERED_LIST = "orderedList",
  COLOR = "color",
  LINK = "link"
}

type RichTextEditorProps = Omit<FormItemProps, "children"> & {
  value?: string;
  containerClassname?: string;
  onChange: (val: string) => void;
};

export const RichTextEditor = (props: RichTextEditorProps) => {
  const { formItemProps, value, onChange, ...restProps } =
    extractFormItemProps(props);

  const { containerClassname } = restProps;

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
      ListItem
    ],
    content: value ? JSON.parse(value) : "",
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    }
  });
  const colorInputRef = useRef<HTMLInputElement>(null);
  const defaultColor = DesignSystemColor.BLACK;

  if (!editor) {
    return null;
  }

  const handleClick = (type: EditorMenuButtonType) => {
    switch (type) {
      case EditorMenuButtonType.BOLD:
        editor.chain().focus().toggleBold().run();

        return;
      case EditorMenuButtonType.ITALIC:
        editor.chain().focus().toggleItalic().run();

        return;
      case EditorMenuButtonType.UNDERLINE:
        editor.chain().focus().toggleUnderline().run();

        return;
      case EditorMenuButtonType.ORDERED_LIST:
        editor.chain().focus().toggleOrderedList().run();

        return;
      case EditorMenuButtonType.BULLET_LIST:
        editor.chain().focus().toggleBulletList().run();

        return;
      case EditorMenuButtonType.COLOR:
        colorInputRef?.current?.focus();
        colorInputRef?.current?.click();

        return;
    }
  };

  const handleColorInput = (event: FormEvent<HTMLInputElement>) => {
    colorInputRef?.current?.blur();
    editor
      .chain()
      .focus()
      .setColor((event?.target as HTMLInputElement)?.value)
      .run();
  };

  const handleContainerClick = () => {
    editor.commands.focus();
  };

  return (
    <FormItem {...formItemProps}>
      <div
        className={twMerge(
          "flex min-h-[320px] flex-col rounded-lg border border-transparent bg-white",
          containerClassname
        )}
      >
        <div className="flex space-x-2 border-0 border-b-0.5 border-solid border-neutral-30 px-4 py-2">
          <EditorMenuButton
            type={EditorMenuButtonType.BOLD}
            onClick={handleClick}
            isActive={editor.isActive(EditorMenuButtonType.BOLD)}
          >
            <BoldOutlined />
          </EditorMenuButton>

          <EditorMenuButton
            type={EditorMenuButtonType.ITALIC}
            onClick={handleClick}
            isActive={editor.isActive(EditorMenuButtonType.ITALIC)}
          >
            <ItalicOutlined />
          </EditorMenuButton>

          <EditorMenuButton
            type={EditorMenuButtonType.UNDERLINE}
            onClick={handleClick}
            isActive={editor.isActive(EditorMenuButtonType.UNDERLINE)}
          >
            <UnderlineOutlined />
          </EditorMenuButton>

          <div className="relative">
            <EditorMenuButton
              type={EditorMenuButtonType.COLOR}
              onClick={handleClick}
            >
              <FontColorsOutlined
                style={{
                  color: editor.getAttributes("textStyle").color || defaultColor
                }}
              />
            </EditorMenuButton>
            <input
              className="absolute top-8 left-2 -z-10 h-0 w-0 border-0 p-0"
              ref={colorInputRef}
              type="color"
              onInput={handleColorInput}
              tabIndex={-1}
              value={editor.getAttributes("textStyle").color || defaultColor}
            />
          </div>

          <EditorMenuButton
            type={EditorMenuButtonType.BULLET_LIST}
            onClick={handleClick}
            isActive={editor.isActive(EditorMenuButtonType.BULLET_LIST)}
          >
            <UnorderedListOutlined />
          </EditorMenuButton>

          <EditorMenuButton
            type={EditorMenuButtonType.ORDERED_LIST}
            onClick={handleClick}
            isActive={editor.isActive(EditorMenuButtonType.ORDERED_LIST)}
          >
            <OrderedListOutlined />
          </EditorMenuButton>
        </div>

        <div
          className="rich-text-editor-content-container flex-1 p-4"
          onClick={handleContainerClick}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </FormItem>
  );
};

type EditorMenuButtonProps = {
  type: EditorMenuButtonType;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  disabled?: boolean;
  onClick: (type: EditorMenuButtonType) => void;
};

const EditorMenuButton = ({
  type,
  children,
  className,
  isActive,
  disabled,
  onClick
}: EditorMenuButtonProps) => {
  const processedClassname = useMemo(() => {
    return twMerge(
      "cursor-pointer border-0 rounded-lg leading-4 w-9 h-9 " +
        (isActive
          ? "bg-primary text-white"
          : "bg-white text-black hover:bg-neutral-30"),
      className
    );
  }, [isActive, className]);

  return (
    <button
      className={processedClassname}
      onClick={() => onClick(type)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
