import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const AuthorPageTemplate = ({
  content,
  contentComponent,
  userName,
  fullName,
  firstName,
  lastName,
  image,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {fullName}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

AuthorPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  userName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  image: PropTypes.string,
  helmet: PropTypes.object.isRequired,
};

const AuthorPage = ({ data }) => {
  const { markdownRemark: post } = data
  const { frontmatter } = post;
  const { siteMetadata } = data.site;

  const fullName = frontmatter.fullName;
  const ogpDescription = `Author | ${siteMetadata.title}`;
  const img = frontmatter.image || siteMetadata.siteLogo || '';
  const ogpImage = img.match(/^https?:\/\/.*/) ?
    img :
    `${siteMetadata.siteUrl}${img}`;
  const ogpUrl = `${siteMetadata.siteUrl}${post.fields.slug}`;

  return (
    <Layout>
      <AuthorPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={frontmatter.description}
        helmet={
          <Helmet
            titleTemplate={`%s | Author | ${siteMetadata.title}`}
          >
            <title>{frontmatter.fullName}</title>
            <meta name="description" content={ogpDescription} />
            <meta property="og:title" content={fullName} />
            <meta property="og:description" content={ogpDescription} />
	          <meta property="og:type" content="profile" />
            <meta property="og:image" content={ogpImage} />
            <meta property="og:section" content="author" />
            <meta property="og:url" content={ogpUrl} />
            <meta property="og:article:username" content={frontmatter.userName} />
            <meta property="og:article:first_name" content={frontmatter.firstName} />
            <meta property="og:article:last_name" content={frontmatter.lastName} />
          </Helmet>
        }
        userName={frontmatter.userName}
        fullName={frontmatter.fullName}
        firstName={frontmatter.firstName}
        lastName={frontmatter.lastName}
        image={frontmatter.image}
      />
    </Layout>
  )
};

AuthorPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default AuthorPage;

export const pageQuery = graphql`
  query AuthorPageByID($id: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        siteLogo
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields { slug }
      frontmatter {
        userName
        fullName
        firstName
        lastName
        image
      }
    }
  }
`;
