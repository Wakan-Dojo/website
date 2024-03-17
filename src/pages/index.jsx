import { graphql } from "gatsby";
import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Section from "../components/section";

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        dir: { glob: "**/sections" }
      }
    ) {
      nodes {
        name
        childMarkdownRemark {
          html
          frontmatter {
            title
            menu_title
            order
            bottom_image
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const sections = data.allFile.nodes.sort(
    (node1, node2) =>
      node1.childMarkdownRemark.frontmatter.order -
      node2.childMarkdownRemark.frontmatter.order
  );
  const staticMenuItems = [
    {
      title: "Facebook",
      icon: "icons/facebook.svg",
      href: "https://www.facebook.com/profile.php?id=100092522586970",
    },
    {
      title: "Discord",
      icon: "icons/discord.svg",
      href: "https://discord.gg/a8vcHhxdPB",
    },
    {
      title: "Instagram",
      icon: "icons/instagram.svg",
      href: "https://www.instagram.com/wakan_dojo/",
    },
  ];

  const menuItems = sections
    .map((node) => ({
      title:
        node.childMarkdownRemark.frontmatter.menu_title ||
        node.childMarkdownRemark.frontmatter.title,
      anchor: node.name,
    }))
    .concat(staticMenuItems);

  return (
    <>
      <Header
        menuItems={menuItems}
        title="Wakan Dōjō"
        subtitle="Association parisienne de Ninjutsu"
        menuOpenWording="Ouvrir le menu"
      ></Header>
      <main>
        {sections.map((node) => (
          <Section
            anchor={node.name}
            title={node.childMarkdownRemark.frontmatter.title}
            content={node.childMarkdownRemark.html}
            bottom_image={node.childMarkdownRemark.frontmatter.bottom_image}
          ></Section>
        ))}
      </main>
      <Footer></Footer>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
