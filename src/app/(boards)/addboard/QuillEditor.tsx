"use client";

import React, { useMemo, useRef } from "react";
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = ["bold", "italic", "underline", "align", "list", "bullet", "color", "image", "link", "height", "width"];

interface QuillEditorProps {
  content: string;
  setContent: (value: string, length: { withSpaces: number; withoutSpaces: number }) => void;
}

function QuillEditor({ content, setContent }: QuillEditorProps) {
  const QuillRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ align: "" }, { align: "center" }, { align: "right" }],
          [{ list: "bullet" }, { list: "ordered" }],
          [{ color: [] }, "image"],
          ["link"],
        ],
      },
    }),
    [],
  );

  const handleQuillChange = (value: string, _: unknown, __: unknown, editor: UnprivilegedEditor) => {
    const inputText = editor.getText().replace(/\n/g, "");

    const withSpaces = inputText.length;
    const withoutSpaces = inputText.replace(/\s/g, "").length;

    setContent(value, { withSpaces, withoutSpaces });
  };

  return (
    <div className="quill-editor-wrapper">
      <ReactQuill
        ref={QuillRef}
        placeholder="본문을 입력해주세요"
        theme="snow"
        modules={modules}
        value={content}
        formats={formats}
        onChange={handleQuillChange}
      />
    </div>
  );
}

export default QuillEditor;
