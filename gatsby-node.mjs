export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      title: String!
      order: Int!
      menuTitle: String
      left_image: String
      bottom_image: String
      map: Map
      gallery: [GalleryItem!]
      blog: Boolean
    }
    type Map {
      geojson: String!
      init_zoom: Int!
      popupContent: [String!]
      token: String!
    }
    type GalleryItem {
      title: String
      url: String!
    }
  `;
  createTypes(typeDefs);
};
