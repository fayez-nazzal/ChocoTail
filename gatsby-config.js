module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Best Pizza`,
                icon: `src/images/icon.png`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-postcss`
    ]
}