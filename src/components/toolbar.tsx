"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { $wrapNodes } from "@lexical/selection";
import {
  $createHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { useCallback } from "react";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const applyHeading = useCallback((tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  }, [editor]);

  return (
    <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 mb-2 rounded">
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>Bold</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>Italic</button>
      <button onClick={() => applyHeading("h1")}>H1</button>
      <button onClick={() => applyHeading("h2")}>H2</button>
      <button onClick={() => applyHeading("h3")}>H3</button>
    </div>
  );
}