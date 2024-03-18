import { graphql } from "gatsby";
import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Blog, Gallery, Map, Section } from "../components/section";

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
    metadata: file(name: { eq: "metadata" }) {
      name
      childContentYaml {
        title
        subtitle
        description
        keywords
        social_card
        social_icons {
          title
          icon
          href
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const sections = data.sections.nodes;

  const metadata = data.metadata.childContentYaml;

  const menuItems = sections
    .map((node) => ({
      title:
        node.childMarkdownRemark.frontmatter.menu_title ||
        node.childMarkdownRemark.frontmatter.title,
      anchor: node.name,
    }))
    .concat(metadata.social_icons);

  let articles = data.articles.nodes.map((node) => ({
    title: node.childMarkdownRemark.frontmatter.title,
    content: node.childMarkdownRemark.html,
    image: node.childMarkdownRemark.frontmatter.image,
  }));
  return (
    <>
      <Header
        menuItems={menuItems}
        title={metadata.title}
        subtitle={metadata.subtitle}
        menuOpenWording="Ouvrir le menu"
      ></Header>
      <main id="content">
        {sections.map((node) => (
          <Section
            key={node.name}
            anchor={node.name}
            title={node.childMarkdownRemark.frontmatter.title}
            content={node.childMarkdownRemark.html}
            leftImage={node.childMarkdownRemark.frontmatter.left_image}
            bottomImage={node.childMarkdownRemark.frontmatter.bottom_image}
          >
            {node.childMarkdownRemark.frontmatter.gallery && (
              <Gallery
                gallery={node.childMarkdownRemark.frontmatter.gallery}
              ></Gallery>
            )}
            {node.childMarkdownRemark.frontmatter.blog && (
              <Blog articles={articles}></Blog>
            )}
            {node.childMarkdownRemark.frontmatter.map && (
              <Map {...node.childMarkdownRemark.frontmatter.map}></Map>
            )}
          </Section>
        ))}
      </main>
      <Footer content={data.footer.childMarkdownRemark.html}></Footer>
    </>
  );
};

export default IndexPage;

export const Head = ({ data }) => {
  const metadata = data.metadata.childContentYaml;
  const fullTitle = `${metadata.title} — ${metadata.subtitle}`;
  return (
    <>
      <html lang="fr" className="scroll-smooth scroll-pt-4" />

      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />

      {/* Favicon */}
      {/* https://favicon.io/favicon-generator/ */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicon-16x16.png"
      />
      <link rel="manifest" href="site.webmanifest" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:image" content={metadata.social_card} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metadata.url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metadata.description} />
      <meta property="twitter:image" content={metadata.social_card} />
    </>
  );
};
