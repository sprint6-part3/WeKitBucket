// import {
//   ClassicEditor,
//   Bold,
//   Essentials,
//   Italic,
//   Paragraph,
//   Heading,
//   Link,
//   Underline,
//   List,
//   Alignment,
//   Image,
//   ImageUpload,
//   MediaEmbed,
// } from "ckeditor5";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { Editor } from "@ckeditor/ckeditor5-core";
// import { UploadAdapter, FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";

// import "ckeditor5/ckeditor5.css";
// import postImage from "@/apis/image/postImage";

// function uploadAdapter(loader: FileLoader): UploadAdapter {
//   return {
//     upload: () => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const file = await loader.file;
//           const result = await postImage(file);
//           console.log(result.url);
//           resolve({
//             default: result.url,
//           });
//         } catch (error) {
//           reject("Hello");
//         }
//       });
//     },
//     abort: () => {},
//   };
// }

// function uploadPlugin(editor: Editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = loader => {
//     // console.log(loader.file);
//     return uploadAdapter(loader);
//   };
// }

// interface IWikitBucketEditor {
//   initialData: string;
//   handleChangeContent: (value: string) => void;
// }

// function WikitBucketEditor({ initialData, handleChangeContent }: IWikitBucketEditor) {
//   return (
//   <CKEditor
//     editor={ClassicEditor}
//     config={{
//       language: "ko",
//       plugins: [
//         Essentials,
//         Bold,
//         Italic,
//         Underline,
//         Paragraph,
//         Heading,
//         Link,
//         List,
//         Alignment,
//         Image,
//         ImageUpload,
//         MediaEmbed,
//       ],
//       toolbar: {
//         items: [
//           "bold",
//           "italic",
//           "underline",
//           "|",
//           "heading",
//           "|",
//           "bulletedList",
//           "numberedList",
//           "|",
//           "alignment",
//           "|",
//           "imageUpload",
//           "mediaEmbed",
//           "link",
//         ],
//       },
//       // extraPlugins: [uploadPlugin],
//     }}
//     data={initialData}
//     onReady={editor => {
//       // You can store the "editor" and use when it is needed.
//       console.log("Editor 1 is ready to use!", editor);
//     }}
//     onChange={(event, editor) => {
//       const data = editor.getData();
//       handleChangeContent(data);
//     }}
//   />
//   );
// }

// export default WikitBucketEditor;

// dummy
import React from "react";

export default function WikitBucketEditor() {
  return <div>WikitBucketEditor</div>;
}
