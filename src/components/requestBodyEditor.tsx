"use client";

import { FC } from 'react';
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from 'verbum';

import "@/app/globals.css"
interface RequestBodyEditorProps {
  onChange: (editorState: unknown) => void;
}

const RequestBodyEditor: FC<RequestBodyEditorProps> = ({ onChange }) => {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true} onChange={onChange}>
        <ToolbarPlugin defaultFontSize="20px" className="custom-toolbar">
          <FontFamilyDropdown />
          <FontSizeDropdown />
          <Divider />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <CodeFormatButton />
          <InsertLinkButton />
          <TextColorPicker />
          <BackgroundColorPicker />
          <TextFormatDropdown />
          <Divider />
          <InsertDropdown enablePoll={true} />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};

export default RequestBodyEditor;