import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { extractPublicId } from "cloudinary-build-url";
import * as React from "react";

export const CloudinaryConfigContext = React.createContext(null);

export const getUrl = ({ name, width, cloudinaryConfig }) => {
  // Because of https://github.com/decaporg/decap-cms/issues/1934, we
  // can't use output_filename_only, so the name is actually the full URL,
  // but we want to extract the filename (including folders).
  // https://res.cloudinary.com/do5ihi4vp/image/upload/v1710891366/wakan-dojo/logo_skevxj.jpg
  const public_id = extractPublicId(name);
  const cld = new Cloudinary({
    cloud: cloudinaryConfig,
  });
  console.log({ name, public_id });
  return cld
    .image(public_id)
    .resize(Resize.limitFit().width(width || 2560))
    .toURL();
};

export const Image = ({ name, alt, width, ...props }) => {
  const cloudinaryConfig = React.useContext(CloudinaryConfigContext);
  const url = getUrl({ name, width, cloudinaryConfig });
  return <img src={url} alt={alt} {...props} />;
};
