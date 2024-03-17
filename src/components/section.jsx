import * as React from "react";

const Section = ({ anchor, title, content, bottom_image }) => {
  console.log(bottom_image);
  return (
    <>
      <section className="container mx-auto max-w-5xl p-12" id={anchor}>
        <h3 className="text-2xl font-extrabold uppercase tracking-wider mb-4">
          {title}
        </h3>
        <p
          className="mb-4 prose max-w-none prose-li:my-0"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </section>
      <section
        className="h-[50vh] bg-cover bg-fixed bg-center"
        style={bottom_image && { backgroundImage: `url(${bottom_image})` }}
      ></section>
    </>
  );
};

export default Section;
