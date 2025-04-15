"use client";

import RequestBodyEditor from "@/components/requestBodyEditor";

const handleEditorChange = (editorState: string) => {
    console.log(editorState);
  };

export default function betaPage() {
  return (
    <>
      <div>Snigel123</div>
      <RequestBodyEditor onChange={handleEditorChange} initialValue='{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"color: #000000;background-color: #ffffff;","text":"wwww","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'/>
    </>
  );
}
