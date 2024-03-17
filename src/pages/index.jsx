import { graphql } from "gatsby";
import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Section from "../components/section";

export const query = graphql`
  query {
    sections: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        dir: { glob: "**/sections" }
      }
      sort: { childMarkdownRemark: { frontmatter: { order: ASC } } }
    ) {
      nodes {
        name
        childMarkdownRemark {
          html
          frontmatter {
            title
            order
            menu_title
            left_image
            bottom_image
            blog
            gallery {
              title
              url
            }
            map {
              geojson
              initZoom
              popupContent
              token
            }
          }
        }
      }
    }
    articles: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        dir: { glob: "**/blog" }
      }
      sort: { name: DESC }
    ) {
      nodes {
        name
        childMarkdownRemark {
          html
          frontmatter {
            title
            image
          }
        }
      }
    }
    footer: file(name: { eq: "footer" }) {
      name
      childMarkdownRemark {
        html
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  console.log(data.sections);
  const sections = data.sections.nodes;
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

  let articles = data.articles.nodes.map((node) => ({
    title: node.childMarkdownRemark.frontmatter.title,
    content: node.childMarkdownRemark.html,
    image: node.childMarkdownRemark.frontmatter.image,
  }));
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
            key={node.name}
            anchor={node.name}
            title={node.childMarkdownRemark.frontmatter.title}
            content={node.childMarkdownRemark.html}
            leftImage={node.childMarkdownRemark.frontmatter.left_image}
            bottomImage={node.childMarkdownRemark.frontmatter.bottom_image}
            gallery={node.childMarkdownRemark.frontmatter.gallery}
            articles={node.childMarkdownRemark.frontmatter.blog && articles}
            map={node.childMarkdownRemark.frontmatter.map}
          ></Section>
        ))}
      </main>
      <Footer content={data.footer.childMarkdownRemark.html}></Footer>
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <html class="scroll-smooth scroll-pt-4" />
  </>
);
