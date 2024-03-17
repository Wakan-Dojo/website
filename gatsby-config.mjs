const config = {
  siteMetadata: {},
  plugins: [
    "gatsby-plugin-decap-cms",
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
  ],
};

export default config;
