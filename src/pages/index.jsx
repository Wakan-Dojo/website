import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import * as React from "react";
import { Blog } from "../components/blog";
import { Footer } from "../components/footer";
import { Gallery } from "../components/gallery";
import { Header } from "../components/header";
import { Map } from "../components/map";
import { Section } from "../components/section";
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
            menuTitle
            leftImageFile {
              childImageSharp {
                gatsbyImageData(width: 600)
              }
            }
            bottomImageFile {
              childImageSharp {
                gatsbyImageData(width: 1920)
              }
            }
            isBlog
            hasMap
            isGallery
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
            imageFile {
              childImageSharp {
                gatsbyImageData(width: 100)
              }
            }
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
        titleTag
        subtitle
        description
        bannerImageFile {
          childImageSharp {
            gatsbyImageData(width: 1920)
          }
        }
        socialCardFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 630, layout: FIXED)
          }
        }
        logoImageFile {
          childImageSharp {
            gatsbyImageData(width: 80, layout: FIXED)
          }
        }
        socialIcons {
          title
          icon
          href
        }
        gallery {
          title
          imageFile {
            childImageSharp {
              gatsbyImageData(width: 600)
            }
          }
        }
      }
    }
    map: file(name: { eq: "map" }) {
      childMarkdownRemark {
        html
        frontmatter {
          geojson
          initZoom
        }
      }
    }
    site {
      siteMetadata {
        mapToken
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
        node.childMarkdownRemark.frontmatter.menuTitle ||
        node.childMarkdownRemark.frontmatter.title,
      anchor: node.name,
    }))
    .concat(metadata.socialIcons);

  const articles = data.articles.nodes.map((node) => ({
    title: node.childMarkdownRemark.frontmatter.title,
    content: node.childMarkdownRemark.html,
    image: getImage(node.childMarkdownRemark.frontmatter.imageFile),
  }));

  const map = {
    popupContent: data.map.childMarkdownRemark.html,
    token: data.site.siteMetadata.mapToken,
    ...data.map.childMarkdownRemark.frontmatter,
  };
  const gallery = metadata.gallery.map((item) => ({
    title: item.title,
    image: getImage(item.imageFile),
  }));

  return (
    <>
      <Header
        menuItems={menuItems}
        title={metadata.title}
        subtitle={metadata.subtitle}
        logoImage={getImage(metadata.logoImageFile)}
        bannerImage={getImage(metadata.bannerImageFile)}
        menuOpenWording="Ouvrir le menu"
      ></Header>
      <main id="content">
        {sections.map((node) => (
          <Section
            key={node.name}
            anchor={node.name}
            title={node.childMarkdownRemark.frontmatter.title}
            content={node.childMarkdownRemark.html}
            leftImage={getImage(
              node.childMarkdownRemark.frontmatter.leftImageFile
            )}
            bottomImage={getImage(
              node.childMarkdownRemark.frontmatter.bottomImageFile
            )}
          >
            {node.childMarkdownRemark.frontmatter.isGallery && (
              <Gallery gallery={gallery}></Gallery>
            )}
            {node.childMarkdownRemark.frontmatter.isBlog && (
              <Blog articles={articles}></Blog>
            )}
            {node.childMarkdownRemark.frontmatter.hasMap && (
              <Map {...map}></Map>
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
  return (
    <>
      <html lang="fr" className="scroll-smooth scroll-pt-4" />

      {/* Primary Meta Tags */}
      <title>{metadata.titleTag}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />

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
      <meta property="og:title" content={metadata.titleTag} />
      <meta property="og:image" content={metadata.socialCard} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metadata.url} />
      <meta property="twitter:title" content={metadata.titleTag} />
      <meta property="twitter:description" content={metadata.description} />
      <meta property="twitter:image" content={metadata.socialCard} />
    </>
  );
};
