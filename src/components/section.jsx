import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import { getUrl } from "./image";
import Markdown from "./markdown";

const SectionContent = ({ title, content, anchor, leftImage }) => {
  if (leftImage) {
    return (
      <div className="flex items-center flex-col md:flex-row">
        <GatsbyImage
          image={leftImage}
          alt=""
          className="h-full w-1/2 m-4 aspect-auto"
        />
        <div className="m-4">
          <SectionContent
            title={title}
            content={content}
            anchor={anchor}
          ></SectionContent>
        </div>
      </div>
    );
  }
  return (
    <>
      <h3 className="text-2xl font-extrabold uppercase tracking-wider mb-4 transition-colors duration-300 hover:text-slate-700">
        <a href={`#${anchor}`}>{title}</a>
      </h3>

      <Markdown content={content}></Markdown>
    </>
  );
};

export const Section = ({
  anchor,
  title,
  content,
  leftImage,
  bottomImage,
  children,
}) => {
  return (
    <>
      <section className="container mx-auto max-w-5xl p-12" id={anchor}>
        <SectionContent
          title={title}
          content={content}
          anchor={anchor}
          leftImage={leftImage}
        ></SectionContent>
        {children}
      </section>
      {bottomImage && (
        <section
          className="h-[50vh] bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${getUrl({
              image: bottomImage,
            })})`,
          }}
        ></section>
      )}
    </>
  );
};
