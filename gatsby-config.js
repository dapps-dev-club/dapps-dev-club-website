module.exports = {
  siteMetadata: {
    title: 'DApps Dev Club',
    description: 'The Decentralised Applications Development Club',
    siteUrl: 'https:\/\/dappsdev.org',
    siteLogo: '/img/dadc-logo-square.png',
    author: 'bguiz',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- excerpt -->',
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-131846766-1',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const { siteMetadata } = site;

              return allMarkdownRemark.edges.map((edge) => {
                const { frontmatter, fields, html, excerpt } = edge.node;
                const { title, date } = frontmatter;

                let content_encoded;
                if (frontmatter.featuredImage) {
                  const img = frontmatter.featuredImage.publicURL;
                  const imgUrl = img.match(/^https?:\/\/.*/) ?
                    img :
                    `${siteMetadata.siteUrl}${img}`;
                  content_encoded =
                    `<img src="${imgUrl}" alt="${title}"></img>\n<br />\n${html}`;
                } else {
                  content_encoded = html;
                }
                const custom_elements = [
                  {
                    "content:encoded": content_encoded,
                  }
                ]

                return Object.assign({
                  title,
                  date,
                }, {
                  description: excerpt,
                  date: frontmatter.date,
                  url: siteMetadata.siteUrl + fields.slug,
                  guid: siteMetadata.siteUrl + fields.slug + '?v=2',
                  custom_elements,
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: {
                    templateKey: { eq: "blog-post" },
                    draft: { ne: true }
                  }},
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        featuredImage {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-redirect-from',
    },
    {
      resolve: 'gatsby-plugin-meta-redirect',
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // must be after other CSS plugins
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders

        // NOTE this plug in does not deal well with snake case CSS class
        // names, and by default purges them all. Need to explicitly white list
        // them, since these ones come from an external library, and thus cannot
        // be renamed.
        whitelistPatterns: [/^tt-cal-.*$/],
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
