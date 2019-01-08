import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title
              description
              siteUrl
              siteLogo
            }
          }
        }
    `}
    render={(data) => {
      const { siteMetadata } = data.site;
      const img = siteMetadata.siteLogo || '';
      const ogpImage = img.match(/^https?:\/\/.*/) ?
        img :
        `${siteMetadata.siteUrl}${img}`;
      const ogpUrl = `${siteMetadata.siteUrl}/`

      return (<div>
        <Helmet>
          <html lang="en" />
          <title>{siteMetadata.title}</title>
          <meta name="description" content={siteMetadata.description} />

          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
	        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
	        <meta name="theme-color" content="#fff" />

          <meta property="og:locale" content="en_GB" />
	        <meta property="og:type" content="website" />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:site_name" content={siteMetadata.title} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta property="og:url" content={ogpUrl} />
          <meta property="og:image" content={ogpImage} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:alt" content={siteMetadata.description} />
        </Helmet>
        <Navbar />
        <div>{children}</div>
      </div>);
      }
    }
  />
)

export default TemplateWrapper
