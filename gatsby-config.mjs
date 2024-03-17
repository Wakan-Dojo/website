import path from "path";
import { fileURLToPath } from "url";

const config = {
  siteMetadata: {
    mapToken:
      "pk.eyJ1IjoiZXdqb2FjaGltIiwiYSI6ImNsMW8wbG8xdzAxMnAzZG5xbjZzZnNxMmUifQ.2om45d2fPNIwlDI3Hy7ZvQ",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-leaflet",
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
        name: "static",
        path: "./static/",
      },
      __key: "static",
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
        )}/src/cms/cms.jsx`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    "gatsby-transformer-yaml",
  ],
};

export default config;
