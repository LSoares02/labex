import React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function Editor({ value, setValue }) {
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
        visibleDragbar={false}
        height={650}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
}
