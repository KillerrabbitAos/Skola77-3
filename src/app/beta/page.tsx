"use client";

import RequestBodyEditor from "@/components/requestBodyEditor";

const handleEditorChange = (editorState: any) => {
    console.log(editorState);
  };

export default function betaPage() {
  return (
    <>
      <div>Snigel123</div>
      <RequestBodyEditor onChange={handleEditorChange}/>
    </>
  );
}
