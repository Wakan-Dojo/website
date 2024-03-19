import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import * as React from "react";

export const CloudinaryConfigContext = React.createContext(null);

export const getUrl = ({ name, width, cloudinaryConfig }) => {
  const cld = new Cloudinary({
    cloud: cloudinaryConfig,
  });
  return cld
    .image(name)
    .resize(Resize.limitFit().width(width || 2560))
    .toURL();
};

export const Image = ({ name, alt, width, ...props }) => {
  const cloudinaryConfig = React.useContext(CloudinaryConfigContext);
  const url = getUrl({ name, width, cloudinaryConfig });
  return <img src={url} alt={alt} {...props} />;
};
