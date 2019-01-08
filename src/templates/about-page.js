import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const AboutPageTemplate = ({ title, content, contentComponent, helmet }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      {helmet || ''}
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = post;
  const { siteMetadata } = data.site;

  const ogpTitle = `${frontmatter.title} | DApps Dev Club`;
  const ogpDescription = frontmatter.description || frontmatter.title;
  const img = frontmatter.image || siteMetadata.siteLogo || '';
  const ogpImage = img.match(/^https?:\/\/.*/) ?
    img :
    `${siteMetadata.siteUrl}${img}`;
  const ogpUrl = `${siteMetadata.siteUrl}${post.fields.slug}`;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        helmet={
          <Helmet
            titleTemplate="%s | DApps Dev Club"
          >
            <title>{`${frontmatter.title}`}</title>
            <meta property="og:type" content="article" />
            <meta property="og:title" content={ogpTitle} />
            <meta property="og:description" content={ogpDescription} />
            <meta property="og:image" content={ogpImage} />
            <meta property="og:url" content={ogpUrl} />
          </Helmet>
        }
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    site {
      siteMetadata {
        siteUrl
        siteLogo
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      fields { slug }
      frontmatter {
        title
        description
      }
    }
  }
`;
