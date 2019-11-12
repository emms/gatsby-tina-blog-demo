const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Gatsby + Tina blog demo`,
    description: `Trying out the Gatsby + Tina combo!`,
    author: `@emms`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        components: path.join(__dirname, 'src/components'),
        'tina-plugins': path.join(__dirname, 'src/tina-plugins'),
      },
    },
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: ['gatsby-tinacms-git', 'gatsby-tinacms-remark'],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
