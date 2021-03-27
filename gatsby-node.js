const url = require("url")
const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: "eval-source-map",
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // if it is a drink
  if (node.ingredients) {
    const urlPath = url.parse(node.url).pathname

    const slug = urlPath
      .slice(0, -1)
      .substring(urlPath.slice(0, -1).lastIndexOf("/") + 1)

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const recepieTemplate = path.resolve("./src/templates/recepie.js")

  const res = await graphql(`
    {
      allDrinkDataJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  res.data.allDrinkDataJson.edges.forEach(edge => {
    createPage({
      component: recepieTemplate,
      path: `/recepie/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
