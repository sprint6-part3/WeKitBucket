"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { UnprivilegedEditor, Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CameraIcon from "@/assets/icons/camera.svg";
import Image from "next/image";
import postImage from "@/apis/image/postImage";
import CommonModal from "@/_components/CommonModal";
import { ImageActions } from "@xeger/quill-image-actions";

Quill.register("modules/imageActions", ImageActions);
const formats = ["bold", "italic", "underline", "align", "list", "bullet", "color", "image", "link", "height", "width"];

interface QuillEditorProps {
  content: string;
  setContent: (value: string, length: { withSpaces: number; withoutSpaces: number }) => void;
  setImageUrl: (url: string) => void;
}

function QuillEditor({ content, setContent, setImageUrl }: QuillEditorProps) {
  const QuillRef = useRef<ReactQuill>(null);
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const handleChangeImage: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files && e.target.files.length > 0) {
      const imgUrl = e.target.files[0];
      setFile(imgUrl);
      setDisabled(false);
    } else {
      console.log("No file selected or file input cleared");
    }
  };

  const handleActive = () => {
    setActive(!active);
    setDisabled(true);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const editor = QuillRef.current?.getEditor();
      if (file && editor) {
        const response = await postImage(file);
        const imageUrl = response.url;
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", imageUrl);
        editor.setSelection(range.index + 1, 0);
        setActive(!active);
        setImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Failed to fetch Post Image: ", error);
    }
  };

  const modules = useMemo(
    () => ({
      imageActions: {},
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ align: "" }, { align: "center" }, { align: "right" }],
          [{ list: "bullet" }, { list: "ordered" }],
          [{ color: [] }, "image"],
          ["link"],
        ],
        handlers: {
          image: () => {
            handleActive();
          },
        },
        ImageResize: {
          modules: ["Resize"],
        },
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
      <CommonModal
        active={active}
        close={handleActive}
        spacing="100px"
        callbackClose={() => {
          setFile(null);
        }}
      >
        <div className="grid gap-5">
          <h3 className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">이미지</h3>
          {file ? (
            <div className="relative flex h-40 items-center justify-center rounded-[10px]">
              <Image src={URL.createObjectURL(file)} alt={file.name} fill style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div className="relative flex h-40 items-center justify-center rounded-[10px] bg-primary-gray-100">
              <CameraIcon width="28.5" height="25.5" />
              <input type="file" onChange={handleChangeImage} className="absolute h-full w-full opacity-0" />
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
            className={`ml-auto h-10 w-[90px] rounded-[10px] ${!disabled ? "bg-primary-green-200" : "bg-primary-gray-300"} text-sm font-semibold leading-[1.7] text-white`}
          >
            삽입하기
          </button>
        </div>
      </CommonModal>
    </div>
  );
}

export default QuillEditor;
