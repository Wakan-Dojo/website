import * as React from "react";
import Markdown from "./markdown";

export const Footer = ({ content }) => {
  return (
    <footer className="container mx-auto max-w-5xl p-12">
      <Markdown className="text-right" content={content}></Markdown>
    </footer>
  );
};
