import * as React from "react";

const Markdown = ({ content, className }) => {
  return (
    <div
      className={`${className} mb-4 prose max-w-none prose-li:my-0 prose-a:underline hover:prose-a:decoration-2`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default Markdown;
