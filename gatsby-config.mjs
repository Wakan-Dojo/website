import path from "path";
import { fileURLToPath } from "url";

const config = {
  siteMetadata: {
    cloudinaryConfig: {
      cloudName: "do5ihi4vp",
    },
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-transformer-remark",
    "gatsby-plugin-react-leaflet",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/",
      },
      __key: "content",
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${path.dirname(
          fileURLToPath(import.meta.url)
        )}/src/cms/cms.js`,
      },
    },
  ],
};

export default config;
