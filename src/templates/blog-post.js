import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content;

  let headerImage;
  if (featuredImage) {
    if (typeof featuredImage === 'string') {
      headerImage = (<img src={featuredImage}></img>);
    } else {
      headerImage = (<Img
        sizes={featuredImage.childImageSharp.sizes}
      ></Img>);
    }
  } else {
    headerImage = null;
  }

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {headerImage}
            <p></p>
            <p><em>{description}</em></p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={`${tag}-tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.object, // string has been parsed by childImageSharp
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = post;
  const { siteMetadata } = data.site;

  console.log('featuredImage', frontmatter.featuredImage);

  const ogpTitle = `${frontmatter.title} | DApps Dev Club`;
  const ogpDescription = `${frontmatter.description}`;
  let img;
  if (frontmatter.featuredImage) {
    img = frontmatter.featuredImage.childImageSharp.sizes.src;
  } else {
    img = siteMetadata.siteLogo || '';
  }
  const ogpImage = img.match(/^https?:\/\/.*/) ?
    img :
    `${siteMetadata.siteUrl}${img}`;
  const ogpUrl = `${siteMetadata.siteUrl}${post.fields.slug}`;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={frontmatter.description}
        helmet={
          <Helmet
            titleTemplate={`%s | News | ${siteMetadata.title}`}
          >
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={ogpDescription} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={ogpTitle} />
            <meta property="og:description" content={ogpDescription} />
            <meta property="og:image" content={ogpImage} />
            <meta property="og:url" content={ogpUrl} />
            <meta property="og:article:published_time" content={`${frontmatter.date}`} />
            <meta property="og:article:modified_time" content={`${frontmatter.updatedDate}`} />
            <meta property="og:section" content={`${frontmatter.section}`} />
            {frontmatter.authors.map((author) => {
              const ogpAuthor = `${siteMetadata.siteUrl}/author/${author}`
              return (
                <meta property="og:author" content={ogpAuthor} key={author} />
              );
            })}
            {frontmatter.tags.map((tag) => {
              return (
                <meta property="og:tag" content={tag} key={tag} />
              );
            })}
          </Helmet>
        }
        tags={frontmatter.tags}
        title={frontmatter.title}
        featuredImage={frontmatter.featuredImage}
      />
    </Layout>
  )
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        siteUrl
        siteLogo
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields { slug }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        updatedDate
        section
        authors
        featuredImage {
          childImageSharp{
              sizes(
                maxWidth: 630
              ) {
                  ...GatsbyImageSharpSizes
              }
          }
        }
      }
    }
  }
`;
