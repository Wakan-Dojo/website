export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      title: String!
      order: Int
      menuTitle: String
      leftImage: String
      leftImageFile: File @link(from: "leftImage" by: "relativePath")
      bottomImage: String
      bottomImageFile: File @link(from: "bottomImage" by: "relativePath")
      isBlog: Boolean
      hasMap: Boolean
      isGallery: Boolean

      image: String
      imageFile: File @link(from: "image" by: "relativePath")
    }
    type ContentYamlGallery implements Node {
      image: String!
      title: String!
      imageFile: File @link(from: "image" by: "relativePath")
    }
    type ContentYaml implements Node {
      logoImage: String!
      logoImageFile: File @link(from: "logoImage" by: "relativePath")
      bannerImage: String!
      bannerImageFile: File @link(from: "bannerImage" by: "relativePath")
      socialCard: String!
      socialCardFile: File @link(from: "socialCard" by: "relativePath")
    }
  `;
  createTypes(typeDefs);
};
