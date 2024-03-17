export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      title: String!
      order: Int!
      menu_title: String
      left_image: String
      bottom_image: String
      map: Map
      gallery: [GalleryItem!]
      blog: Boolean
    }
    type Map {
      geojson: String!
      initZoom: Int!
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
