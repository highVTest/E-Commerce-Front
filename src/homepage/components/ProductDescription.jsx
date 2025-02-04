import React from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const content = '<h2 style="text-align: center;">상세 설명</h2>';

const ProductDescription = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    // <RichTextEditor editor={editor}>
    //   <RichTextEditor.Toolbar sticky stickyOffset={60}>
    //     <RichTextEditor.ControlsGroup>
    //       <RichTextEditor.Bold />
    //       <RichTextEditor.Italic />
    //       <RichTextEditor.Underline />
    //       <RichTextEditor.Strikethrough />
    //       <RichTextEditor.ClearFormatting />
    //       <RichTextEditor.Highlight />
    //       <RichTextEditor.Code />

    //       <RichTextEditor.H1 />
    //       <RichTextEditor.H2 />
    //       <RichTextEditor.H3 />
    //       <RichTextEditor.H4 />

    //       <RichTextEditor.Blockquote />
    //       <RichTextEditor.Hr />
    //       <RichTextEditor.BulletList />
    //       <RichTextEditor.OrderedList />
    //       <RichTextEditor.Subscript />
    //       <RichTextEditor.Superscript />

    //       <RichTextEditor.Link />
    //       <RichTextEditor.Unlink />

    //       <RichTextEditor.AlignLeft />
    //       <RichTextEditor.AlignCenter />
    //       <RichTextEditor.AlignJustify />
    //       <RichTextEditor.AlignRight />

    //       <RichTextEditor.Undo />
    //       <RichTextEditor.Redo />
    //     </RichTextEditor.ControlsGroup>
    //   </RichTextEditor.Toolbar>

    //   <RichTextEditor.Content style={{ minHeight: '300px', width: '800px', backgroundColor: 'gray' }} />
    // </RichTextEditor>
    <div></div>
  );
};

export default ProductDescription;
