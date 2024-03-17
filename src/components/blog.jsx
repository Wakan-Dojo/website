import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import Markdown from "./markdown";

const Article = ({ article }) => {
  return (
    <div className="m-4 flex flex-col md:flex-row">
      <GatsbyImage image={article.image} alt={article.title} className="w-64" />
      <div className="m-4">
        <h3 className="text-xl font-extrabold uppercase tracking-wider mb-4">
          {article.title}
        </h3>
        <Markdown content={article.content}></Markdown>
      </div>
    </div>
  );
};

export const Blog = ({ articles }) => {
  return articles.map((article) => (
    <Article key={article.title} article={article}></Article>
  ));
};
