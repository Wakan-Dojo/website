import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

export const Gallery = ({ gallery }) => {
  return (
    <div className="flex items-center flex-wrap justify-evenly">
      {gallery.map((item) => (
        <GatsbyImage
          key={item.image.images.fallback.src}
          image={item.image}
          alt={item.title}
          className="w-full md:w-5/12 m-4 rounded-lg"
        />
      ))}
    </div>
  );
};
