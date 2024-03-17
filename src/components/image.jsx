import * as React from "react";

export const getUrl = ({ image }) => {
  return image.images.fallback.src;
};

export const Image = ({ image, alt, width, ...props }) => {
  const url = getUrl({ image, width });
  return <img src={url} alt={alt} {...props} />;
};
