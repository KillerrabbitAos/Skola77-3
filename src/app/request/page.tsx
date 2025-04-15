"use client";

import { useSearchParams } from "next/navigation";
import { useGroupStore } from "@/lib/store";
import { useEffect, useState, useRef } from "react";
import { Group } from "@prisma/client";
import { useDynamicInterval } from "@/hooks/useDynamicInterval";
import { groupFetchIntervalSteps } from "@/config";
import { useTheme } from "next-themes";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

export default function Page() {
  const searchParams = useSearchParams();
  const [saved, setSaved] = useState(false);
  const id = searchParams.get("id");
  const storedGroup = useGroupStore((state) => state.selectedGroup);
  const clearSelectedGroup = useGroupStore((state) => state.clearSelectedGroup);
  const [group, setGroup] = useState<Group | null>(storedGroup || null);
  const { theme } = useTheme();

  const editorRef = useRef<Editor>(null);

  async function updateGroup(updatedGroup: Group) {
    try {
      const response = await fetch(`/api/groups`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
      });
      if (!response.ok) {
        console.error("Failed to update group");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchGroup = async () => {
    try {
      const response = await fetch(`/api/groups?id=${id}`);
      if (!response.ok) {
        console.error("Failed to fetch group");
        return;
      }
      const data: Group = await response.json();
      if (JSON.stringify(data) === JSON.stringify(group)) return;
      setGroup(data);
    } catch (error) {
      console.error(error);
    }
  };

  useDynamicInterval(fetchGroup, groupFetchIntervalSteps);

  useEffect(() => {
    if (storedGroup) clearSelectedGroup();
    if (id) {
      fetchGroup();
    } else {
      setGroup(null);
    }
  }, []);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const updatedBody = editorRef.current.getInstance().getMarkdown();
      if (group && updatedBody !== group.body) {
        const updatedGroup = { ...group, body: updatedBody };
        setGroup(updatedGroup);
        updateGroup(updatedGroup).catch(console.error);
      }
    }
  };

  if (!id || !group) return null;

  return (
    <div>
      <input
        type="text"
        placeholder="Request title"
        value={group.name}
        className="m-1 pl-3 mb-7 py-1 w-150 text-3xl light:border-gray-500 light:border-2 light:rounded light:bg-gray-200 dark:bg-[#222222]"
        style={{ outline: "none" }}
        onChange={(e) => {
          const updatedGroup = { ...group, name: e.target.value };
          setGroup(updatedGroup);
          updateGroup(updatedGroup).catch(console.error);
        }}
      />
      <div className="mx-1 max-w-200">
        <Editor
          theme={
            theme === "dark"
              ? "dark"
              : theme === "classic"
              ? "default"
              : "light"
          }
          ref={editorRef}
          initialValue={group.body || ""}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          onChange={handleEditorChange}
        />
        <button
          className="p-4 mt-1 bg-gray-300 rounded text-black w-full"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 1070);
          }}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
