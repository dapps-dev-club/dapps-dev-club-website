import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
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
  const fullName = post.frontmatter.fullName;
  const ogpDescription = `${fullName} | Author`;
  const img = post.frontmatter.image || data.site.siteMetadata.siteLogo || '';
  const ogpImage = img.match(/^https?\:\/\/.*/) ?
    img :
    `${data.site.siteMetadata.siteUrl}${img}`;

  return (
    <Layout>
      <AuthorPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Author | DApps Dev Club"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={ogpDescription} />
            <meta property="og:title" content={fullName} />
            <meta property="og:description" content={ogpDescription} />
	          <meta property="og:type" content="profile" />
            <meta property="og:image" content={ogpImage} />
            <meta property="og:section" content="author" />
            <meta property="og:url" content={`/author/${post.frontmatter.userName}`} />
            <meta property="og:article:username" content={post.frontmatter.userName} />
            <meta property="og:article:first_name" content={post.frontmatter.firstName} />
            <meta property="og:article:last_name" content={post.frontmatter.lastName} />
          </Helmet>
        }
        title={post.frontmatter.title}
        userName={post.frontmatter.userName}
        fullName={post.frontmatter.fullName}
        firstName={post.frontmatter.firstName}
        lastName={post.frontmatter.lastName}
        image={post.frontmatter.image}
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
        siteUrl
        siteLogo
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
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
